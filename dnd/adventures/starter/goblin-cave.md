# The Goblin Cave

## Metadata
- Level: 1-2
- Party Size: 1 (solo adventure)
- Estimated Duration: 30-60 minutes
- Tags: combat, exploration, beginner
- Description: A band of goblins has been raiding merchant caravans on the road. Track them to their lair and put an end to their thievery!

## Introduction

You've been hired by the Merchant's Guild to deal with a goblin problem. Several caravans have been ambushed on the North Road, and the trail leads to a cave in the Darkwood Hills.

As you approach the cave entrance, you can see crude goblin totems marking the territory. The stench of refuse and smoke wafts from within.

---

## Room: cave-entrance

### Cave Entrance

**Description:** A jagged cave mouth opens before you, about ten feet wide and eight feet tall. Crude spears and bones are arranged in warning patterns around the entrance. The sounds of crackling fire and guttural voices echo from within.

**Perception DC 12:** You notice faint footprints in the mud - at least half a dozen small humanoid tracks leading in and out.

**Stealth Check:** If you want to enter quietly, make a Stealth check. DC 10 to avoid alerting the guards.

**Choices:**
- [Enter cautiously (Stealth DC 10)] -> goblin-guard-post
- [Charge in boldly!] -> goblin-guard-post-alert
- [Search for another entrance (Perception DC 15)] -> hidden-entrance
- [Set up an ambush at the entrance] -> ambush-setup

---

## Room: goblin-guard-post

### Guard Post

**Description:** The cave opens into a wider chamber lit by a smoky fire. Two goblins sit around the flames, gnawing on what appears to be dried meat. Their crude spears lean against the cave wall nearby.

If you entered quietly, the goblins haven't noticed you yet.

**Encounter:** goblin-guards
- 2x Goblin
- Environment: dim light, rocky terrain

**On Victory:**
- XP: 50
- Loot: 8 silver pieces, rusty shortsword

**Investigation DC 12:** Among the goblins' belongings, you find a merchant's coin purse with 15 gold pieces.

**Choices:**
- [Continue deeper into the cave] -> main-cavern
- [Search the bodies] -> goblin-guard-post (Investigation check)
- [Head back to the entrance] -> cave-entrance

---

## Room: goblin-guard-post-alert

### Guard Post (Alerted!)

**Description:** Your bold entrance echoes through the cave! Two goblins leap to their feet, grabbing their spears with practiced speed. They screech warnings deeper into the cave.

**Encounter:** goblin-guards-alert
- 2x Goblin (prepared for combat, +2 initiative)
- Environment: dim light, rocky terrain

The alarm has been raised! Future encounters may be more difficult.

**Sets Flag:** goblins-alerted

**On Victory:**
- XP: 50
- Loot: 8 silver pieces, rusty shortsword

**Choices:**
- [Push forward quickly before reinforcements arrive!] -> main-cavern
- [Retreat and try the hidden entrance] -> cave-entrance

---

## Room: hidden-entrance

### Hidden Entrance

**Description:** You find a narrow crack in the hillside, partially concealed by thornbushes. It's a tight squeeze, but you can fit through.

**Acrobatics DC 10:** Navigate the tight passage without getting stuck.

On success: You emerge in a storage area behind the main cavern.
On failure: Take 1d4 scraping damage from the rough rocks, then continue.

**Choices:**
- [Squeeze through] -> storage-room
- [Return to the main entrance] -> cave-entrance

---

## Room: ambush-setup

### Ambush Preparation

**Description:** You find good cover behind some boulders near the cave entrance and wait. After about ten minutes, a goblin emerges to relieve himself.

**Stealth DC 8:** Remain hidden as the goblin approaches.

On success: You get a surprise round!
On failure: The goblin spots you and runs back inside screaming.

**Encounter:** solo-goblin
- 1x Goblin (surprised if stealth succeeded)

**On Victory:**
- XP: 25

**Choices:**
- [Enter the cave now] -> goblin-guard-post
- [Wait for more goblins to come out] -> ambush-waiting

---

## Room: storage-room

### Storage Chamber

**Description:** Crates and sacks line the walls of this small chamber - clearly stolen goods from the caravan raids. A crude wooden door leads to a larger cavern.

**Investigation DC 10:** You find useful supplies among the stolen goods.

On success: Gain a Potion of Healing!

**Choices:**
- [Carefully open the door] -> main-cavern-stealth
- [Kick down the door!] -> main-cavern
- [Search more thoroughly (takes time)] -> storage-room (sets thorough-search flag)

---

## Room: main-cavern

### Main Cavern

**Description:** This large natural cavern serves as the goblins' main living space. Crude bedrolls and cook fires dot the floor. A raised stone platform at the far end holds a slightly larger goblin wearing a crude crown - the Goblin Boss!

**Requires Flag Check:** If "goblins-alerted" is set, add 1 additional goblin to the encounter.

**Encounter:** goblin-lair
- 3x Goblin
- 1x Goblin Boss
- Environment: dim light, scattered cover (overturned tables, rock pillars)

**On Victory:**
- XP: 250
- Loot: Crown of Goblin Command (trinket worth 25 gp), 45 gold pieces, Merchant Guild Seal

**Choices:**
- [Collect the merchant seal and loot] -> victory
- [Search the boss's throne area] -> boss-throne

---

## Room: main-cavern-stealth

### Main Cavern (Stealth Approach)

**Description:** Peering through the door, you see the main goblin lair. Several goblins lounge about, and their boss sits on a raised platform picking his teeth with a dagger.

**Stealth DC 13:** Sneak into position for a surprise attack.

On success: You get a surprise round on all enemies!

**Encounter:** goblin-lair-surprise
- 3x Goblin (surprised)
- 1x Goblin Boss (surprised)
- Environment: dim light, you have advantage on first attack

**On Victory:**
- XP: 275 (bonus for stealth approach)
- Loot: Crown of Goblin Command (trinket worth 25 gp), 45 gold pieces, Merchant Guild Seal

**Choices:**
- [Collect your rewards] -> victory
- [Search the throne area] -> boss-throne

---

## Room: boss-throne

### The Boss's Throne

**Description:** Behind the crude stone throne, you find a locked chest.

**Thieves' Tools DC 12 or Strength DC 15:** Open the chest.

On success: Inside you find:
- 75 gold pieces
- A silver ring worth 15 gp
- A Scroll of Shield (wizard spell)
- A map showing the location of a larger dungeon... (hook for future adventure!)

**Choices:**
- [Take the loot and leave victorious] -> victory
- [Study the map more closely] -> map-study

---

## Room: victory

### Victory!

**Description:** With the goblin threat eliminated and the merchant seal recovered, you make your way back to town. The Merchant's Guild is overjoyed to hear of your success!

**Rewards:**
- Quest XP: 100
- Guild Reward: 50 gold pieces
- Reputation: +1 with Merchant's Guild

**Congratulations, adventurer! The roads are safe once more... for now.**

---

## Monsters

### Goblin
- AC: 15 (leather armor, shield)
- HP: 7 (2d6)
- Speed: 30 ft.
- STR 8 (-1), DEX 14 (+2), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)
- Skills: Stealth +6
- Senses: Darkvision 60 ft., passive Perception 9
- CR: 1/4 (50 XP)
- **Nimble Escape:** Can take Disengage or Hide as a bonus action.
- **Scimitar:** +4 to hit, 5 (1d6+2) slashing damage.
- **Shortbow:** +4 to hit, range 80/320, 5 (1d6+2) piercing damage.

### Goblin Boss
- AC: 17 (chain shirt, shield)
- HP: 21 (6d6)
- Speed: 30 ft.
- STR 10 (+0), DEX 14 (+2), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 10 (+0)
- Skills: Stealth +6
- Senses: Darkvision 60 ft., passive Perception 9
- CR: 1 (200 XP)
- **Multiattack:** Makes two attacks with scimitar.
- **Scimitar:** +4 to hit, 5 (1d6+2) slashing damage.
- **Redirect Attack:** When a creature the boss can see targets it with an attack, the boss chooses a goblin within 5 feet. The two swap places, and the chosen goblin becomes the target instead.
