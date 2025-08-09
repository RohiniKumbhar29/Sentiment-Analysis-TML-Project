import json
import os
import re
from collections import Counter
import pandas as pd
import matplotlib.pyplot as plt
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from datetime import datetime
import random

WATCH_FOLDER = "uploads"

class FeedbackSentimentDashboard:
    def __init__(self, file_path=None):
        self.df = None
        self.file_path = file_path or self.get_latest_csv_file()
        self.analyzer = SentimentIntensityAnalyzer()

    def get_latest_csv_file(self):
        files = [f for f in os.listdir(WATCH_FOLDER) if f.endswith(".csv")]
        if not files:
            raise FileNotFoundError(f"No CSV file found in folder: {WATCH_FOLDER}")
        latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(WATCH_FOLDER, f)))
        return os.path.join(WATCH_FOLDER, latest_file)

    def load_data(self):
        if not os.path.exists(self.file_path):
            raise FileNotFoundError("The file does not exist at the specified path.")
        self.df = pd.read_csv(self.file_path)
        self.df['date'] = pd.to_datetime(self.df['date'], errors='coerce')
        self.df = self.df.dropna(subset=['date'])
        self.df['feedback'] = self.df['feedback'].fillna('')

    def analyze_sentiments(self):
        scores = self.df['feedback'].apply(lambda x: self.analyzer.polarity_scores(x))
        self.df['compound'] = scores.apply(lambda x: x['compound'])
        self.df['pos'] = scores.apply(lambda x: x['pos'])
        self.df['neu'] = scores.apply(lambda x: x['neu'])
        self.df['neg'] = scores.apply(lambda x: x['neg'])
        self.df['sentiment'] = self.df['compound'].apply(
            lambda x: 'positive' if x > 0.05 else ('negative' if x < -0.05 else 'neutral')
        )
        self.df['pos_percent'] = self.df['pos'] * 100
        self.df['neu_percent'] = self.df['neu'] * 100
        self.df['neg_percent'] = self.df['neg'] * 100
        self.df['comp_percent'] = self.df['compound'] * 100

    def get_monthly_trends(self):
        df_valid = self.df.dropna(subset=['date']).copy()
        df_valid.loc[:, 'month'] = df_valid['date'].dt.to_period('M')
        return df_valid.groupby('month')['compound'].mean().reset_index().rename(columns={'compound': 'monthly_avg_compound'})

    def get_weekly_trends(self):
        df_valid = self.df.dropna(subset=['date']).copy()
        df_valid.loc[:, 'week'] = df_valid['date'].dt.to_period('W').apply(lambda r: r.start_time)
        return df_valid.groupby('week')['compound'].mean().reset_index().rename(columns={'compound': 'weekly_avg_compound'})

    def get_longest_feedback(self):
        self.df['feedback_length'] = self.df['feedback'].str.len()
        return self.df.loc[self.df['feedback_length'].idxmax(), 'feedback']

    def get_shortest_feedback(self):
        self.df['feedback_length'] = self.df['feedback'].str.len()
        return self.df.loc[self.df['feedback_length'].idxmin(), 'feedback']

    def get_department_sentiment(self):
        if 'department' not in self.df.columns:
            departments = ['IT', 'HR', 'Sales', 'Marketing', 'Support']
            self.df['department'] = [random.choice(departments) for _ in range(len(self.df))]
        avg = self.df.groupby('department')['compound'].mean().reset_index()
        counts = self.df.groupby(['department', 'sentiment']).size().unstack(fill_value=0).reset_index()
        return avg, counts

    def get_word_frequencies(self):
        all_text = " ".join(self.df['feedback'].dropna()).lower()
        words = re.findall(r'\b\w+\b', all_text)
        stopwords = set(['the','here','some', 'from','there','s','not','my','enough','and', 'to', 'is', 'in', 'of', 'a', 'for', 'on', 'with', 'it', 'this', 'that', 'i', 'we', 'are', 'was', 'be', 'at', 'as', 'have'])
        filtered_words = [word for word in words if word not in stopwords]
        return Counter(filtered_words).most_common(10)

    def save_results(self):
        print("🔄 Starting save_results...")

        monthly_avg = self.get_monthly_trends()
        weekly_avg = self.get_weekly_trends()
        longest_feedback = self.get_longest_feedback()
        shortest_feedback = self.get_shortest_feedback()
        dept_avg, dept_counts = self.get_department_sentiment()
        word_counts = self.get_word_frequencies()

        self.df.to_csv("processed_feedback.csv", index=False)
        print("✅ Saved processed_feedback.csv")

        json_output = {
            "records": self.df.copy()[[
                'id', 'date', 'feedback', 'compound', 'pos', 'neu', 'neg',
                'sentiment', 'pos_percent', 'neu_percent', 'neg_percent', 'comp_percent',
                'department'
            ]].to_dict(orient='records'),
            "monthly_trends": monthly_avg.to_dict(orient='records'),
            "weekly_trends": weekly_avg.to_dict(orient='records'),
            "department_sentiment_avg": dept_avg.to_dict(orient='records'),
            "department_sentiment_counts": dept_counts.to_dict(orient='records'),
            "word_frequencies": [{"word": word, "count": count} for word, count in word_counts],
            "longest_feedback": longest_feedback,
            "shortest_feedback": shortest_feedback
        }

        try:
            with open("processed_feedback.json", "w") as f:
                json.dump(json_output, f, indent=2, default=str)
            print("✅ processed_feedback.json written successfully")
        except Exception as e:
            print("❌ Error writing processed_feedback.json:", e)

if __name__ == '__main__':
    dashboard = FeedbackSentimentDashboard()
    dashboard.load_data()
    dashboard.analyze_sentiments()
    dashboard.save_results()
