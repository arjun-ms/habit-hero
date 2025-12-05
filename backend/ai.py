import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
load_dotenv()

# Load API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def generate_motivation(habit_name, category, notes):
    prompt = f"""
    Create one short, powerful motivational quote for a person trying to maintain the habit:
    Habit: {habit_name}
    Category: {category}
    Recent notes: {notes}

    Requirements:
    - Positive tone
    - Very short (1–2 sentences)
    - Directly encourage the user to continue the habit
    """

    model = genai.GenerativeModel("gemini-2.5-flash")

    response = model.generate_content(prompt)

    return response.text.strip()

async def suggest_from_existing(habits):
    habit_list = "\n".join([f"- {h['name']} ({h.get('category', 'uncategorized')})" for h in habits])

    prompt = f"""
    The user has the following habits:

    {habit_list}

    Based on these, suggest 5 new habits they might want to develop.
    Provide short, practical suggestions.
    Return only the suggestions, no explanation.
    """
    model = genai.GenerativeModel("gemini-2.5-flash")

    response = model.generate_content(prompt)
    return response.text.strip()


async def suggest_from_goals(goals):
    prompt = f"""
    The user has these personal goals:

    "{goals}"

    Suggest 5 new habits that directly support these goals.
    Each habit should be specific and actionable.
    Return only the list.
    """

    model = genai.GenerativeModel("gemini-2.5-flash")

    response = model.generate_content(prompt)
    return response.text.strip()


async def analyze_notes(notes: list[str]):

    if not notes:
        return {
            "mood_trend": "neutral",
            "themes": [],
            "insight": "Not enough notes to analyze yet."
        }
    model = genai.GenerativeModel("gemini-2.5-flash")
    
    combined = "\n".join(notes)

    prompt = f"""
    You are an AI that analyzes habit-tracking journal notes.

    NOTES:
    {combined}

    TASKS:
    1. Determine overall mood trend:
       - positive / neutral / negative
    2. Detect recurring themes (1–3 words each)
    3. Provide *one short insight* useful for a habit-building dashboard.

    Respond ONLY with valid JSON (no markdown, no code blocks, no explanations):
    {{
        "mood_trend": "...",
        "themes": ["...", "..."],
        "insight": "..."
    }}
    """

    try:
        response = model.generate_content(prompt)
        raw = response.text.strip()

        # Remove markdown code blocks if present
        if raw.startswith("```json"):
            raw = raw[7:]  # Remove ```json
        elif raw.startswith("```"):
            raw = raw[3:]  # Remove ```
        if raw.endswith("```"):
            raw = raw[:-3]  # Remove closing ```
        raw = raw.strip()

        result = json.loads(raw)
        
        # Ensure all required fields are present
        if "mood_trend" not in result:
            result["mood_trend"] = "neutral"
        if "themes" not in result:
            result["themes"] = []
        if "insight" not in result:
            result["insight"] = "Analysis completed."
            
        return result
    except json.JSONDecodeError as e:
        # Fallback if JSON parsing fails
        return {
            "mood_trend": "neutral",
            "themes": [],
            "insight": f"Could not parse AI response. Raw response: {raw[:100]}"
        }
    except Exception as e:
        raise Exception(f"Error analyzing notes: {str(e)}")