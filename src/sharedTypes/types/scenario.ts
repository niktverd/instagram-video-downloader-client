import {z} from 'zod';

import {
    DeleteScenarioParamsSchema,
    GetAllScenariosParamsSchema,
    GetScenarioByIdParamsSchema,
    GetScenarioBySlugParamsSchema,
    UpdateScenarioParamsSchema,
} from '../schemas/handlers/scenario';
import {ScenarioSchema} from '../schemas/models/scenario';
import {
    scenarioAddBannerAtTheEndUniqueSchema,
    scenarioBaseSchema,
    scenarioCoverWithGreenUniqueSchema,
    scenarioShortifyUniqueSchema,
} from '../schemas/scenario';
export type IScenario = z.infer<typeof ScenarioSchema>;
export type ScenarioBase = z.infer<typeof scenarioBaseSchema>;
export type ScenarioAddBannerAtTheEndUnique = z.infer<typeof scenarioAddBannerAtTheEndUniqueSchema>;
export type ScenarioShortifyUnique = z.infer<typeof scenarioShortifyUniqueSchema>;
export type ScenarioCoverWithGreenUnique = z.infer<typeof scenarioCoverWithGreenUniqueSchema>;
export type ScenarioV4 =
    | ScenarioAddBannerAtTheEndUnique
    | ScenarioShortifyUnique
    | ScenarioCoverWithGreenUnique;
export type CreateScenarioParams = Omit<IScenario, 'id'>;
export type CreateScenarioResponse = IScenario;
export type GetScenarioByIdParams = z.infer<typeof GetScenarioByIdParamsSchema>;
export type GetScenarioByIdResponse = IScenario;
export type GetScenarioBySlugParams = z.infer<typeof GetScenarioBySlugParamsSchema>;
export type GetScenarioBySlugResponse = IScenario;
export type GetAllScenariosParams = z.infer<typeof GetAllScenariosParamsSchema>;
export type GetAllScenariosResponse = IScenario[];
export type UpdateScenarioParams = z.infer<typeof UpdateScenarioParamsSchema>;
export type UpdateScenarioResponse = IScenario;
export type DeleteScenarioParams = z.infer<typeof DeleteScenarioParamsSchema>;
export type DeleteScenarioResponse = number;
