
export interface Article {
  id: string;
  hora: string;
  link_noticia: string;
  link_foto: string;
  autor: string;
  categorias: string[];
  cuerpo: string;
  volanta: string;
  fecha: string;
  fecha_resumen: string;
  etiquetas: string[];
  titulo: string;
  resumen: string;
  medio: string;
  // Add additional fields from output data
  adjectives?: any;
  entities?: {entities_freq: [any,any][], entities_list:  { text: string; type: string; start_char: number; end_char: number;sentiment: number }[]};
  metrics?: Metrics;
  sentiment?: any;
  sources?: any;
  status?: string;
}

export interface Metrics {
  authors: number;
  articles: number;
  reviewed: number;
  pending: number;
  unreviewed: number;
}

export interface EntityMetrics {
  Lugar: number;
  Persona: number;
  Organización: number;
  Misceláneo: number;
  Fecha:number;
}







/// metrics

export interface Metrics {
  adjectives: Adjectives;
  entities:   Entities;
  general:    General;
  sentiment:  Sentiment;
  sources:    Sources;
}

export interface Adjectives {
  num_adjectives:  NumAdjectives;
  perc_adjectives: NumAdjectives;
}

export interface NumAdjectives {
  full_name: string;
  name:      string;
  reference: number;
  value:     number;
}

export interface Entities {
  num_entidades:              NumAdjectives;
  num_entidades_lugar:        NumAdjectives;
  num_entidades_misc:         NumAdjectives;
  num_entidades_organizacion: NumAdjectives;
  num_entidades_persona:      NumAdjectives;
}

export interface General {
  num_chars:       NumAdjectives;
  num_chars_title: NumAdjectives;
  num_sentences:   NumAdjectives;
  num_words:       NumAdjectives;
}

export interface Sentiment {
  sentimiento_global_negativo: NumAdjectives;
  sentimiento_global_neutro:   NumAdjectives;
  sentimiento_global_positivo: NumAdjectives;
}

export interface Sources {
  num_afirmaciones:            NumAdjectives;
  num_afirmaciones_explicitas: NumAdjectives;
  num_conectores:              NumAdjectives;
  num_conectores_unique:       NumAdjectives;
  num_referenciados:           NumAdjectives;
  num_referenciados_unique:    NumAdjectives;
}
