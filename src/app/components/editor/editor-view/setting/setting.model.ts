import { getDefault } from '../../../print-canvas/canvas-setting-form/canvas-setting.model';
import { SETTING_CONST } from './setting.const';

export class SettingClass {
  model: string;
  status: boolean;
  jobid: boolean;

  constructor(
    model?: string,
    status?: boolean,
    jobid?: boolean
  ) {
    this.model = model || getDefault(SETTING_CONST).value;
    this.status = typeof status === 'boolean' ? status : false;
    this.jobid = typeof jobid === 'boolean' ? jobid : false;
  }
}
