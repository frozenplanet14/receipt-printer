import { MODES, COLORS, HALFTONES } from '../../../../print-canvas/canvas-setting-form/canvas-setting.model';
import { FORM_TYPE_CONST } from './form-type.const';

export const IMAGE_FORM_ITEM = {
  img: 'image.png',
  name: 'Image',
  alt_text: 'image',
  hasDelete: true,
  form: [{
    id: 'attr-image-file',
    type: FORM_TYPE_CONST.FORM_TYPE_FILE_UPLOAD,
    label: 'Image File',
    value: 'sample.png'
  }, {
    id: 'attr-image-fit',
    type: FORM_TYPE_CONST.FORM_TYPE_CHECK_BOX,
    label: 'Scale to Fit Paper Width',
    value: false
  }, {
    id: 'attr-image-mode',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Mode',
    options: MODES
  }, {
    id: 'attr-image-brightness',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Brightness',
    value: 1.0,
    min: 0.1,
    max: 10,
    step: 0.1
  }, {
    id: 'attr-image-color',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Color (Monochrome)',
    options: COLORS
  }, {
    id: 'attr-image-halftone',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
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
    id: 'attr-logo-key1',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Keycode 1',
    value: 48,
    min: 32,
    max: 126,
    step: 1
  }, {
    id: 'attr-logo-key2',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Keycode 2',
    value: 48,
    min: 32,
    max: 126,
    step: 1
  }]
};
