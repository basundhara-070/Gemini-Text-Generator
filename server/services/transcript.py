from youtube_transcript_api import YouTubeTranscriptApi
import sys, json

# Get video ID from command line
video_id = sys.argv[1]

try:
    ytt_api = YouTubeTranscriptApi()
    transcript_data = ytt_api.fetch(video_id).to_raw_data()
    transcript = " ".join([item['text'] for item in transcript_data])
    print(json.dumps(transcript))
except Exception as e:
    print(json.dumps({"error": str(e)}))
