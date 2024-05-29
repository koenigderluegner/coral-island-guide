## Changelog

### 0.20.1 2024-05-29

#### Changed

- \[Beta] Updated beta data to v1.1-1076 (Steam version)

### 0.20.0 2024-05-27

#### Added

- \[Beta] Added ocean produce to journal
- \[Beta] Added treasure maps to journal
- \[Beta] Added custom npc head portraits
- \[Beta] Added requirements to merfolk general store items
- \[Beta] Added ramen shop
- More entries can be added to to-dos (although being uncategorized for now)
- Added festival opening hours

#### Changed

- \[Beta] Updated beta data to v1.1-1063 (Steam version)
- \[Beta] Fixed missing beta notification for orchestra zones
- Fixed link to settings in "beta only"-landing page
- High-res NPC images were swapped for compressed ones to save bandwidth and improve performance
- Various UI and UX improvements:
    - More consistent spacing across the app
    - Reduced large gaps to make many things more compact
    - Sidebars, main content and details now have their own scroll area
    - Fixed floating 'X' on detail cards
    - Reduced content jumping
  - Fixed active highlight for processors when closing details

### 0.19.0 2024-05-22

#### Added

- \[Beta] Added more images to NPCs like alternate forms of Sawee
- \[Beta] Added new Shops: Tidal Threads, Taco Truck, Underwater Ranch and Sales Cart Stall
- \[Beta] Added Orchestra Zones to locations
- Added new Shops: Furniture Store

#### Changed

- \[Beta] Fixed missing crop to seed mapping for new seeds

### 0.18.0 2024-05-21

#### Added

- Added data for beta 1.1 (game version v1.1-1051 on Steam)
    - Go to [My guide -> Settings](/my/settings) to activate the beta.
    - Some features received changes or weren't fetched correctly - this problem is known and will be fixed in the next
      few days (example NPC images)
- Reactivated To-Do lists.
    - To-Dos are now more flexible and can store all items. If context is given, they will be categorized else they will
      go into "Uncategorized"-category at the end.
    - Many categories/contexts were added
- Added map icon, birthday, marriage possibility and description to NPC details
- Made items in gifting grid clickable for details
    - This does not apply for categories like "all fruits"

### 0.17.2 2024-03-28

#### Changed

- Fixed incomplete recipes for Lodeh, Fried Rice and Rainbow Sandwich

### 0.17.1 2024-03-24

#### Changed

- Fixed npc filter on mobile causing broken layouts

### 0.17.0 2024-03-24

#### Added

- Added filter and sort options to NPC overview
- Added filter and sort options to NPC gifting
- Added description, birthday and datable status to NPC overview
- Added checklist to NPC heart event details
- Made NPC entry in gifting page collapsible
- Added enchantment points to found items in journal
- Added fish pattern and difficulty to journal and details
- Added permanently visible label for inputs to show what they represent
- Added museum fish to My Coral Guide dashboard
- Added location filter to caught journal

#### Changed

- Fixed portrait for npc missing after try to hide spoilers
- Fixed Zarahs 6b heart event requirements not being parsed correctly
- Fixed cheese press not showing recipe for gold milk input
- Fixed journal filter on mobile/smaller devices being cut off

### 0.16.1 2024-02-23

#### Changed

- Updated live data to v1-945 except character images (Steam version)

### 0.16.0 2024-02-01

In the last update, I added the groundwork for a new way to retrieve item data. This update focuses a lot on those new
changes, please let me know if you encounter any issues.

#### Added

- Added latest changelog, which shows up once per update per device.
    - You can disable them via the changelog dialog or dis-/enable them under My Guide -> Settings
- Added game version of shown data to footer.
- Added sources (geodes, coffer etc) to "found" items in journal
- Added cooking recipes to checklist
- Added catching and found-data to museum checklist
- Added artisan details to journal produce
- Added animal produce to journal produce
- Offering checklist and lake temple/altars now show lots more info like fish location etc.

#### Changed

- Updated live data to v1-310 except character images (Steam version)
- Database now uses new item system, drastically reducing initial loading time and bandwidth.
- Fixed fish with multiple locations per time slot not showing all spawn configurations

#### Known issues

- To-Dos are mostly disabled due to the changes to item data handling. Fix planned for next update.

### 0.15.0 2023-12-03

Note: This update is primarily for technical reasons. If you encounter any issues, please send me a message.
All your feedback and requests (thanks for them!) are still being worked on.

#### Added

- Added Pufferfish shop to beach clean up festival

#### Changed

- Updated live data to v1-176 except character images (Steam version)
- Fixed clicking on 'Reset beta checklists' label activating the wrong checkbox
- Fixed NPC details showing "No NPC found" while still loading

### 0.14.0 2023-11-14

#### Added

- Added 1.0 assets and data
- Added animals to ranch shop
- Added product size per mood per hearts to ranch as well
- Added support for korean and brazilian portuguese
- Added separator to locations and sorted shops alphabetically
- Added new type of generic cooking ingredients
- Added all known festival shops to locations
- Added Raj's Coffee Corner, Fishensips and White Flamingo to shops
    - Additional info like open hours will be added later
- Added settings to delete checklists

#### Changed

- Added missing recipes in database, when an item was in the list of "either or" ingredients
- Reduced height of sidebar items on bigger screens
- NPC overview is now the entry page for NPC category instead of gifting
    - Also swapped positions of sub navi entries
- Renamed achievements to badges to match in-game

### 0.13.0 2023-11-01

#### Added

- WIP: Added translation of in-game data. Text added by Coral Guide won't be translated in this version.
    - Go to "my guide" -> "settings" to change your language.
- Added B.O.S., Bens caravan and Socket and Pan shop items
- Added manual mapping for cooking utensils to show in database to reduce confusion about internal names
- Added more images for generic items like "any butter" etc.

#### Changed

- Fixed database not showing selected item if filter doesn't match (for example via direct url access).
    - This should help sharing links for users with different language settings.
- Fixed checklist tab names being wrong in some cases
- Fixed altars and offering checklist showing wrong item instead of tag based item
- Fixed Joko and Valentina head image being broken
- Fixed a few descriptions being missing

### 0.12.0 2023-10-15

#### Added

- Added domain to coral guide called coral.guide.
    - This will most likely cause your settings to be lost due to the way how browsers work
- Added footer and about page
    - There you can find ways to contact me, ways to support Coral Guide and general information
- Added PWA support
- Added new section "My Guide"
    - This section is primarily for user created data, checklists, settings etc
    - Added offering checklist
    - Added museum checklist
    - Added cooking recipe checklist
- Added heart event triggers to NPCs
- Added birthdays to NPC gifting
- Added gifting preferences to NPC details
- Added merit exchange
- Added letters and torn pages to journal
- Added bestiary to journal
    - Added possible drops to database as well
- Added npc gifting preferences to database
- Added manual mapping for processors to show in database to reduce confusion about internal names
- Added collapsable to database details, click on the header to collapse/expand
- Added more error/empty result messages across the app

#### Changed

- Renamed checklists to to-dos and moved them to "My Guide"
- Moved settings to "My Guide"
- Changed sizes of grid icons, allowing the grid to show more icons in a row
- Increased visibility of tab arrows, making it easier to see if tabs can be scrolled
- Slightly darkened background to increase contrast
- Decreased padding of cards by 25% in higher resolutions
- Changed default text color with a color of higher contrast to improve readability
- Fixed settings unintentionally saving when clicking somewhere on the card
- Fixed odd label state when inputs are empty and active
- Fixed missing menu item when viewing NPC details

### 0.11.1 2023-09-14

#### Added

- Added achievements to journal
- Added concerned monkey shop
- Added requirements and effects to concerned monkey and blacksmith.
    - Further additions will come at a later point

#### Changed

- Updated live data to 0.5-167 except character images

### 0.11.0 2023-09-07

#### Added

- Added live data up to update v0.5-148
    - Removed all "beta only" locks
- Added lab produce upgrades
- Added ranch (without animals) and beach shack shops
- Added auto opt-out of beta if no beta is ongoing

#### Changed

- Fixed pet shop data not being loaded when opening database without being at pet shop before
- Fixed data being cut in tables
- Fixed stretched icons on mobile
- Fixed stretched head portraits on mobile

### 0.10.1 2023-09-04

#### Changed

- Updated beta data to 0.5-120
- Added more guesses to map more images to NPCs.
- Fixed missing icons of pets in pet shop
- Fixed season filter not working for crops. Thanks Snowy Owl on Discord for reporting.

### 0.10.0 2023-09-01

#### Added

- Added pet shop
- Added NPC list
    - Some images are marked as unofficial. Those images are either official and weren't mapped correctly or are made by
      me.
    - Added appearances to NPC detail page. Further information will come at a later point.

#### Changed

- Changed people URL to npcs. A redirection was added for now.
- Updated beta data to 0.5-111

### 0.9.4 2023-08-24

#### Changed

- Updated beta data to 0.5-103
- Removed note that some shops aren't reachable as it doesn't apply anymore
- Reduced database file sizes to save bandwidth/loading time
- Added Webp images to drastically reduce file size for images to save bandwidth/loading time

### 0.9.3 2023-08-22

#### Changed

- Updated beta data to 0.5-101

### 0.9.2 2023-08-15

#### Changed

- Fixed database not loading in live mode. Thanks jennawebbles for reporting.

### 0.9.1 2023-08-15

#### Changed

- Updated beta data to 0.5-87

### 0.9.0 2023-08-14

#### Added

- Added more shops: Lab, Sams general store, Carpenter, Merfolk general store and Merfolk tail store
- Added tables to shop data and shop processing
    - Those tables were added to database as well
- Added town rank to shop data details
- Added upgrade data to shops

### 0.8.0 2023-08-07

#### Added

- Added checklists
    - There are separate lists for beta and live version.
    - To add entries, open details for an entry for example a fish in journal and press the checklist icon at the top of
      the card next to the 'x'.
    - Added option to reset checklist in settings if something gets stuck.
- Added sell price to items without qualities to database
- \[Experimental] Beta only: Added blacksmith to locations
    - Shows opening hours, stocklist and item processing
        - Values might be incorrect, as data without implementation is ambiguous
    - Data will be added to database at a later point.

#### Changed

- Minor visual improvements in gifting list

### 0.7.4 2023-07-26

#### Added

- Added descriptions to database entries

#### Changed

- Added beta data for version 0.5-67

### 0.7.3 2023-07-21

#### Changed

- Added beta data for version 0.5-19

### 0.7.2 2023-05-19

#### Changed

- Added live data for version 0.4

### 0.7.1 2023-05-11

#### Changed

- Changed beta data and images to version Beta Hotfix v-0.4-63857

### 0.7.0 2023-04-29

#### Added

- Added beta mode. Go to settings, enable the checkbox and save to reload. Reverse to go back to live data.

### 0.6.0 2023-04-10

#### Added

- Added direct urls to journal tabs
- Added title to views so that the browser tab name should be more useful
- Added quality prices to database if existent
- Added locations
    - Added lake temple with offerings as first location
        - Added offerings to database
- Added data tables to all journal and crafting pages
- Added sorting to existing tables (note: not all columns are sortable)
- Added highlight for selected item in grid view
- Added buffs and nutrition to cooking

#### Changed

- Fixed wrong title for ocean critters in database
- Reordered database detail information to put best match on top
- Added spaces to processor names
- Fixed ground beetle being missing at journal page

### 0.5.1 2023-03-24

#### Changed

- Fixed broken artisan page. Thanks to apra on discord for the quick feedback.

### 0.5.0 2023-03-24

#### Added

- Added information for bugs and sea critters. Thanks to Nautilus on Discord for telling me where to find the necessary
  data!
    - The season filter now works for them as well
- Item database to look up items and their uses
- Added button to detail cards to open selected item in database.
- Added overlay menu for mobile users.

#### Changed

- Moved amount in detail cards more to the center to not fly off.
- Filtered a few technical items to reduce data download size.

### 0.4.1 2023-03-22

#### Changed

- Removed quality grid in cooking as it always produces base quality
- Fixed multiple entries for same recipe in dye maker
- Removed empty dish from cooking
- Fixed multiple of same item listed as addition to generic in cooking

### 0.4.0 2023-03-21

#### Added

- Added cooking under crafting
- Added fruit tree and fruit plants data to journal crops
- Added handling of refinements and deviating processing time per quality
    - This fixes the multiple entries for the aging barrel
- Show output amount for inventory crafting as well

### 0.3.4 2023-03-15

#### Added

- Added data of spring update 2023 (2022-03-14)
- Show output amount for processing

### 0.3.3 2022-12-09

#### Added

- Added data of winter update 2022 (2022-12-09)
    - Fixed parsing errors caused by this
- Added mastery unlocks to crafting recipes

### 0.3.2 2022-11-01

#### Added

- Added locations to fish details
- Added table view for caught-journal
- Added filter for seasons (fish journal only at the moment)
- Added browser theme color (mobile)
- Added support for Safaris viewport-fit (landscape mode)

#### Changed

- Fixed rarity text for caught journal entries

### 0.3.1 2022-10-30

#### Changed

- Fixed missing neutral, disliked and hated gifts

### 0.3.0 2022-10-30

#### Added

- Added gifting information

### 0.2.0 2022-10-30

#### Added

- Added mobile support
- Added item processors to crafting

#### Changed

- Fixed seed item descriptions showing placeholders instead of (re-)grow time
- Fixed item category not being properly displayed
- Fixed card icon being stretched under special circumstances
- Minified data to save bandwidth

### 0.1.2 - 2022-10-28

#### Changed

- Fixed header icon

### 0.1.1 - 2022-10-28

#### Changed

- Fixed base url

### 0.1.0 - 2022-10-28

#### Added

- Initial release
