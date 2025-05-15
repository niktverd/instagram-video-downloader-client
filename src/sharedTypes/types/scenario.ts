import {z} from 'zod';

import {
    DeleteScenarioParamsSchema as _DeleteScenarioParamsSchema,
    GetAllScenariosParamsSchema as _GetAllScenariosParamsSchema,
    GetScenarioByIdParamsSchema as _GetScenarioByIdParamsSchema,
    GetScenarioBySlugParamsSchema as _GetScenarioBySlugParamsSchema,
    UpdateScenarioParamsSchema as _UpdateScenarioParamsSchema,
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
export type GetScenarioByIdParams = z.infer<typeof _GetScenarioByIdParamsSchema>;
export type GetScenarioByIdResponse = IScenario;
export type GetScenarioBySlugParams = z.infer<typeof _GetScenarioBySlugParamsSchema>;
export type GetScenarioBySlugResponse = IScenario;
export type GetAllScenariosParams = z.infer<typeof _GetAllScenariosParamsSchema>;
export type GetAllScenariosResponse = IScenario[];
export type UpdateScenarioParams = z.infer<typeof _UpdateScenarioParamsSchema>;
export type UpdateScenarioResponse = IScenario;
export type DeleteScenarioParams = z.infer<typeof _DeleteScenarioParamsSchema>;
export type DeleteScenarioResponse = number;
