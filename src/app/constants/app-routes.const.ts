import { RouteLinkModel } from '../models/route-link.model';

export const APP_ROUTES: RouteLinkModel[] = [
  {
    iconName: 'settings',
    displayName: 'Printer Setting',
    route: 'setting'
  }, {
    iconName: 'print',
    displayName: 'Print Options',
    route: 'printOptions'
  }, {
    displayName: 'Canvas Print',
    route: 'canvas',
    iconName: 'style',
    children: [
      {
        displayName: 'Image / PDF',
        route: 'canvas/image',
        iconName: 'image'
      },
      {
        displayName: 'Text',
        route: 'canvas/text',
        iconName: 'text_format'
      },
      {
        displayName: 'Bar Code',
        route: 'canvas/barcode',
        iconName: 'bar_chart'
      },
      {
        displayName: 'Graph',
        route: 'canvas/graph',
        iconName: 'graphic_eq'
      },
      {
        displayName: 'Handwriting',
        route: 'canvas/handwriting',
        iconName: 'format_paint'
      },
      {
        displayName: 'Label',
        route: 'canvas/label',
        iconName: 'label'
      }
    ]
  }, {
    iconName: '',
    displayName: 'Editor',
    route: 'editor'
  }
];
