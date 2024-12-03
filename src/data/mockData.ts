import type { Article, Metrics, EntityMetrics } from '../types';

export const mockMetrics: Metrics = {
  authors: 8,
  articles: 25,
  reviewed: 12,
  pending: 6,
  unreviewed: 7
};

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Escala la pelea de Milei con gobernadores e intendentes por el costo del ajuste y los dialoguistas buscan una salida',
    author: 'John Snow',
    status: 'pending',
    date: '16 Feb, 2024 02:09',
    content: `Con duras críticas, el presidente defendió la decisión de no enviar más fondos para salarios docentes y transporte. Más mandatarios provinciales y municipales amagan con ir a la Justicia. El caso Llanera, un encuentro clave y el factor Macri.

Javier Milei está decidido a que el costo del ajuste no recaiga sólo en la Presidencia y en las cuentas provinciales. La escalada que se agudizó en las últimas horas con los gobernadores y los intendentes se inscribe en esa lógica: el primer mandatario está decidido a que cada jurisdicción esté obligada a reducir de manera drástica sus presupuestos, la cantidad de empleados públicos y el destino de los impuestos que cobran y las transferencias que reciben de la administración central.

El choque de Milei y la cantante pop Lali Espósito no puede entenderse si no se lo incorpora en esta misma secuencia de presidente aplicando sin contemplaciones un "Plan Motosierra" que tiene como objetivo un ajuste de más del 5% del Producto. La casi totalidad de los políticos surgidos del voto popular - que no son de La Libertad Avanza ni del PRO- están en pie de guerra por esos recursos: de gobernadores a intendentes, de diputados a senadores.

Cada uno a su manera emprendió la resistencia al draconiano plan fiscal que propone Milei como primer paso para romper un statu quo de estancamiento económico, crecimiento de la pobreza y deterioro acelerado de la calidad de vida.`
  },
  {
    id: '2',
    title: 'Otro artículo de ejemplo',
    author: 'Eric Idle',
    status: 'reviewed',
    quality: 78,
    date: '15 Feb, 2024'
  },
  {
    id: '3',
    title: 'Un tercer artículo',
    author: 'Eva Wallace',
    status: 'unreviewed',
    date: '14 Feb, 2024'
  }
];

export const mockEntityMetrics: EntityMetrics = {
  people: 76,
  places: 12,
  dates: 28,
  organizations: 38
};

export const mockSources = [
  { name: "2024 Inflation (INDEC)", link: "#" },
  { name: "Survey of Milei", link: "#" },
  { name: "Economic Report", link: "#" },
  { name: "2024 Inflation (INDEC)", link: "#" }
];