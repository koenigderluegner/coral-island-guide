import { HeartEvent, HeartEventTriggerData } from "@ci/data-types";


export class HeartEventsDbGenerator {

    constructor(protected heartEventTriggers: Map<string, HeartEventTriggerData>) {
    }

    generate(): Map<string, Record<string, HeartEvent[]>> {
        const result: Map<string, Record<string, HeartEvent[]>> = new Map<string, Record<string, HeartEvent[]>>();

        const heartEvents: HeartEvent[] = []

        const heartEventTriggers = [...this.heartEventTriggers.values()];

        heartEventTriggers.forEach(trigger => {

            const {heartLevel, npc, ...data} = trigger

            let matchingHeartEvent = heartEvents.find(hs => hs.heartLevel === heartLevel && hs.npc === npc);

            if (!matchingHeartEvent) {
                matchingHeartEvent = {
                    npc: trigger.npc,
                    heartLevel: trigger.heartLevel,
                    trigger: []
                }

                heartEvents.push(matchingHeartEvent);
            }

            matchingHeartEvent.trigger.push(data);


        });

        heartEvents.forEach(hs => hs.trigger.sort((a, b) => {
            const otherStatesA = a.otherCutscenesState.map(states => Object.keys(states)).flat()
            const otherStatesB = b.otherCutscenesState.map(states => Object.keys(states)).flat()

            return otherStatesA.includes(b.cutscene)
                ? 1
                : otherStatesB.includes(a.cutscene)
                    ? -1
                    : 0
        }))

        heartEvents.sort((a, b) => {
            const heartLevel = a.heartLevel - b.heartLevel;
            const npcCompare = a.npc.localeCompare(b.npc);
            return npcCompare === 0 ? heartLevel : npcCompare
        })

        const resObj: Record<string, HeartEvent[]> = {}

        heartEvents.map(hs => hs.npc).forEach(npc => resObj[npc.toLowerCase()] = heartEvents.filter(hs => hs.npc === npc))


        result.set('unused', resObj)

        return result;
    }
}
