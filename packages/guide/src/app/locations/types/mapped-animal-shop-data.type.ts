import { AnimalData, AnimalShopData } from "@ci/data-types";

export type MappedAnimalShopData = Omit<AnimalShopData, 'animalKey'> & { animal: AnimalData | undefined }
