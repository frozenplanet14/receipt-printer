import { RouteLinkModel } from '../models/route-link.model';

export const APP_ROUTES: RouteLinkModel[] = [
  {
    displayName: 'Printer Setting',
    route: 'setting'
  }, {
    displayName: 'Print Options',
    route: 'printOptions'
  }, {
    displayName: 'Canvas Print',
    route: 'canvas',
    children: [
      {
        displayName: 'Image',
        route: 'canvas/image',
      },
      {
        displayName: 'Text',
        route: 'canvas/text',
      },
      {
        displayName: 'Bar Code',
        route: 'canvas/barcode',
      },
      {
        displayName: 'Graph',
        route: 'canvas/graph',
      },
      {
        displayName: 'Handwriting',
        route: 'canvas/handwriting'
      },
      {
        displayName: 'Label',
        route: 'canvas/label'
      }
    ]
  }
];
