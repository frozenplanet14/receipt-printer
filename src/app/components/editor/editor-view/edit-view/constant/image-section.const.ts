import { FORM_TYPE_SLIDER, FORM_TYPE_FILE_UPLOAD, FORM_TYPE_CHECK_BOX, FORM_TYPE_SELECT } from './form-type.const';
import { MODES, COLORS, HALFTONES } from '../../../../print-canvas/canvas-setting-form/canvas-setting.model';

export const IMAGE_FORM_ITEM = {
  img: 'image.png',
  name: 'Image',
  alt_text: 'image',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_FILE_UPLOAD,
    label: 'Image File',
    value: 'sample.png'
  }, {
    type: FORM_TYPE_CHECK_BOX,
    label: 'Scale to Fit Paper Width',
    value: false
  }, {
    type: FORM_TYPE_SELECT,
    label: 'Mode',
    options: MODES
  }, {
    type: FORM_TYPE_SLIDER,
    label: 'Brightness',
    value: 1.0
  }, {
    type: FORM_TYPE_SELECT,
    label: 'Color (Monochrome)',
    options: COLORS
  }, {
    type: FORM_TYPE_SELECT,
    label: 'Halftone (Monochrome)',
    options: HALFTONES
  }]
};

export const NV_LOGO_FORM_ITEM = {
  img: 'logo.png',
  name: 'NV Logo',
  alt_text: 'logo',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SLIDER,
    label: 'Keycode 1',
    value: 48
  }, {
    type: FORM_TYPE_SLIDER,
    label: 'Keycode 2',
    value: 48
  }]
};
