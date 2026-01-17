def opening_scene():
    return """
It’s a cold December night in 1986.

Christmas lights glow weakly across Hawkins, half-hearted and tired, as a lone boy pedals his bike through empty streets. The decorations feel forced—plastic cheer stapled onto a town that doesn’t quite believe in it anymore.

As he rides, something flickers.

One house. Then another.

The lights stutter unnaturally, buzzing like a warning. He slows down, heart thumping, telling himself it’s nothing. Old wiring. Bad luck.

Then—

Something appears in the road.

The bike skids. Metal screams. He crashes hard onto the asphalt, breath knocked from his lungs.

The air feels wrong now. Heavy. Watching.

Behind him, the lights go out.

He isn’t alone anymore.
"""

def scene_one(choice):
    if choice == "mike":
        return (
            "You run towards Mike's house. The Christmas lights flicker behind you. "
            "You can feel it—the monster is closing in."
        )
    elif choice == "road":
        return (
            "You pick up the bike and race down the road. Full speed. Then—silence. "
            "The bike stops. A bloody red hand grips your shoulder. You never stood a chance."
        )
    elif choice == "woods":
        return (
            "You ditch the bike and vanish into the woods, heading for the barn near your house. "
            "There’s a weapon there. A showdown awaits."
        )
    else:
        return "Frozen in fear, you hesitate—and hesitation is dangerous."
