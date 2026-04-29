# 🕵️ Project Idea: Disco Elysium-Style Narrative RPG

> A narrative-driven RPG inspired by Disco Elysium — built around skill checks, branching dialogue, internal monologue, and deep worldbuilding.

---

## 🧠 Core Systems to Build

### 1. Skill / Attribute System
- Character sheet with grouped skills and numeric values
- Skills that **passively trigger** thoughts or dialogue options
- Dice roll + skill modifier system for checks (2d6 + skill vs. difficulty)

### 2. Dialogue System
- Branching trees with choices leading to different outcomes
- Condition gates — options only appear if skill ≥ X, or if you've done Y
- Skill voices — internal monologue lines triggered by character stats
- Success / failure / locked states for skill checks

### 3. Thought Cabinet
- Equippable "thoughts" that passively modify stats over time
- Essentially a buff/debuff system tied to narrative events

### 4. World Interaction
- Clickable hotspots on the environment
- Isometric or painterly 2D camera
- Area transitions
- Time/day system (some checks only available at certain times)

### 5. Journal / Task System
- Quest log with narrative flavor text
- Tasks that can fail, expire, or have multiple outcomes

---

## 🛠️ Recommended Tech Stack

### Engine
| Option | Language | Best For |
|---|---|---|
| **Godot 4** | GDScript / C# | Free, open source, great 2D |
| **Unity** | C# | Industry standard, large ecosystem |

### Dialogue Tool: Ink by Inkle
A scripting language purpose-built for branching narrative. Integrates with both Godot and Unity.

```ink
=== talk_to_suspect ===
You approach the man in the fishing village.

* [Ask about the body]
    -> ask_body
* [Ask about last night]
    -> ask_night
* (skill_check >= 4) [Analyze his posture]
    Your PHYSICAL INSTRUMENT notices his hands are shaking.
    -> physical_check
```

---

## 🎨 Art & Visual Tools

| Purpose | Tool | Cost |
|---|---|---|
| Painterly 2D environments | Krita | Free |
| Pixel art / sprites | Aseprite | ~$20 |
| UI design | Figma | Free tier |
| Isometric maps | Tiled | Free |
| Animation | Spine or Godot built-in | Spine is paid |

---

## 🔊 Audio Tools

| Purpose | Tool |
|---|---|
| Music composition | LMMS (free) or GarageBand |
| Sound effects | Audacity (free) |
| Advanced audio mixing | FMOD (free for indie) |
| Voiceover recording | Audacity + USB mic |

---

## 💻 Languages

| Language | Purpose |
|---|---|
| GDScript or C# | Game logic — stats, checks, saving, world state |
| Ink | All dialogue, branching narrative, skill voice lines |
| JSON | Storing game data (items, skill definitions, NPC data) |
| GLSL (optional) | Custom shaders for painterly/stylized visuals |

---

## 📐 Skill Check Logic (GDScript)

```gdscript
func roll_skill_check(skill_name: String, difficulty: int) -> String:
    var skill_value = player.get_skill(skill_name)
    var roll = randi() % 6 + randi() % 6 + 2  # 2d6
    var total = roll + skill_value

    if total >= difficulty + 4:
        return "success_spectacular"
    elif total >= difficulty:
        return "success"
    elif total >= difficulty - 3:
        return "failure"
    else:
        return "failure_disastrous"
```

---

## 🗂️ Suggested Project Structure

```
/project
  /dialogue        ← all .ink files
  /scenes          ← Godot scenes (areas, NPCs, UI)
  /scripts         ← GDScript logic (skill system, dice rolls, etc.)
  /assets
    /art           ← backgrounds, characters
    /audio         ← music, sfx, voice
  /data            ← JSON files for skills, items, thoughts
```

---

## 🗺️ Learning Path

1. **Week 1–2** — Learn Godot basics (GDQuest YouTube channel)
2. **Week 3** — Learn Ink scripting (Inkle's official tutorials)
3. **Week 4** — Integrate Ink into Godot, build a simple 2-screen dialogue demo
4. **Month 2** — Build the skill/stat system and wire it to dialogue conditions
5. **Month 3+** — Build your first real area with NPCs, checks, and a task

---

## 🔑 Key Insight

> Disco Elysium's genius is that **the writing IS the game**. The systems exist to serve the narrative, not the other way around. Before writing a line of code, invest serious time in your world's lore, your protagonist's skill set, and at least one complete dialogue tree on paper.

---

*Generated with Claude — April 2026*
