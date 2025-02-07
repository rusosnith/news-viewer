import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLocationDot, 
  faCalendarDays, 
  faBuilding,
  faFont,
  faLink,
  faQuoteLeft,
  faEllipsis,
  faCheck,
  faClock,
  faWarning,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import type { Article } from '../types';
import * as d3 from 'd3';
import { useRef, useEffect, useMemo } from 'react';

interface HomeMetricsProps {
  articles: Article[];
}

const typeConfig = {
  Personas: { icon: faUser, color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
  Lugares: { icon: faLocationDot, color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
  Otros: { icon: faCalendarDays, color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
  Organizaciones: { icon: faBuilding, color: 'text-cyan-500', bgColor: 'bg-cyan-100' },
};

const sourceConfig = {
  Links: { icon: faLink, color: 'text-amber-700', bgColor: 'bg-amber-100' },
  Dichos: { icon: faQuoteLeft, color: 'text-amber-700', bgColor: 'bg-amber-100' },
  Textuales: { icon: faCalendarDays, color: 'text-amber-700', bgColor: 'bg-amber-100' },
  Otros: { icon: faEllipsis, color: 'text-amber-700', bgColor: 'bg-amber-100' },
};

const statusConfig = {
  Autores: { icon: faUser, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  Artículos: { icon: faNewspaper, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  Revisados: { icon: faCheck, color: 'text-green-600', bgColor: 'bg-green-100' },
  Pendientes: { icon: faClock, color: 'text-amber-500', bgColor: 'bg-amber-100' },
  'Sin revisión': { icon: faWarning, color: 'text-red-500', bgColor: 'bg-red-100' },
};

// Componente específico para el gráfico de distribución
const AdjectivesDistribution = ({ articles }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!articles.length || !containerRef.current) return;

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const percentages = articles.map(article => 
      (article.metrics?.adjectives.perc_adjectives.value || 0) * 100
    );

    // Aumentamos el alto del SVG
    const width = containerWidth;
    const height = 60;  // Aumentamos la altura
    const margin = { top: 20, right: 0, bottom: 10, left: 0 };  // Más espacio arriba
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Calcular estadísticas
    const median = d3.median(percentages);
    const max = d3.max(percentages);

    // Escalas
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, innerWidth]);

    // Limpiar SVG existente
    d3.select(svgRef.current).selectAll("*").remove();

    // Crear SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Dibujar barra base
    svg.append("rect")
      .attr("class", "base-bar")
      .attr("x", 0)
      .attr("y", innerHeight / 2 - 2)
      .attr("width", innerWidth)
      .attr("height", 4)  // Mismo grosor que las barras de entidades
      .attr("rx", 2)
      .attr("fill", "#E9D5FF");

    // Dibujar puntos para cada artículo
    percentages.forEach(p => {
      svg.append("circle")
        .attr("cx", xScale(p))
        .attr("cy", innerHeight / 2)
        .attr("r", 3)
        .attr("fill", "#A855F7");
    });

    // Dibujar línea de mediana con el mismo grosor
    svg.append("line")
      .attr("x1", xScale(median))
      .attr("x2", xScale(median))
      .attr("y1", 5)  // Empezamos un poco más abajo del texto
      .attr("y2", innerHeight)
      .attr("stroke", "#A855F7")
      .attr("stroke-width", 4);  // Mismo grosor que las barras

    // Ajustamos la posición del texto
    svg.append("text")
      .attr("x", xScale(median))
      .attr("y", 0)  // Posición más arriba
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#6B7280")
      .text(`Mediana ${median.toFixed(1)}%`);

  }, [articles]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef} />
    </div>
  );
};

const AdjectivesHistogram = ({ articles }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!articles.length || !containerRef.current) return;

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const percentages = articles
      .map(article => (article.metrics?.adjectives.perc_adjectives.value || 0) * 100)
      .filter(value => value <= 100);

    const bins = Array(20).fill(0);
    percentages.forEach(p => {
      const binIndex = Math.min(Math.floor(p / 5), 19);
      bins[binIndex]++;
    });

    const maxBinCount = Math.max(...bins);

    const width = containerWidth;
    const height = 100;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }; // Agregamos márgenes laterales
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Escalas
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, maxBinCount])
      .range([innerHeight, 0]);

    // Limpiar SVG existente
    d3.select(svgRef.current).selectAll("*").remove();

    // Crear SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Dibujar las barras del histograma
    bins.forEach((count, i) => {
      svg.append("rect")
        .attr("x", xScale(i * 5))
        .attr("y", yScale(count))
        .attr("width", innerWidth / 20 - 1)
        .attr("height", innerHeight - yScale(count))
        .attr("fill", "#A855F7")
        .attr("fill-opacity", "0.35")  // 65% transparente
        .attr("rx", 2);
    });

    // Dibujar eje X
    svg.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", innerHeight)
      .attr("y2", innerHeight)
      .attr("stroke", "#6B7280")  // Cambiado a gray
      .attr("stroke-width", 1);

    // Marcas en el eje X
    [0, 50, 100].forEach(value => {
      // Línea vertical sutil
      svg.append("line")
        .attr("x1", xScale(value))
        .attr("x2", xScale(value))
        .attr("y1", innerHeight)
        .attr("y2", innerHeight + 5)
        .attr("stroke", "#9CA3AF")
        .attr("stroke-width", 1);

      // Texto con tamaño aumentado
      svg.append("text")
        .attr("x", xScale(value))
        .attr("y", innerHeight + 15)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px") // Aumentado de 10px a 12px
        .attr("fill", "#6B7280")
        .text(`${value}%`);
    });

    // Calcular y dibujar la línea de mediana
    const median = d3.median(percentages);
    svg.append("line")
      .attr("x1", xScale(median))
      .attr("x2", xScale(median))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#A855F7")
      .attr("stroke-width", 2);

    // Agregar texto de mediana
    svg.append("text")
      .attr("x", xScale(median))
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#6B7280")
      .text(`Mediana ${median.toFixed(1)}%`);

  }, [articles]);

  return (
    <div ref={containerRef} className="w-full">
      <svg ref={svgRef} />
    </div>
  );
};

export default function HomeMetrics({ articles }: HomeMetricsProps) {
  // Calcular métricas de entidades
  const entityMetrics = articles.reduce((acc, article) => {
    if (article.entities?.entities_list) {
      article.entities.entities_list.forEach(entity => {
        switch(entity.type) {
          case 'Persona': acc.Personas++; break;
          case 'Lugar': acc.Lugares++; break;
          case 'Misceláneo': acc.Otros++; break;  // Cambiado al tipo correcto
          case 'Organización': acc.Organizaciones++; break;
        }
      });
    }
    return acc;
  }, { Personas: 0, Lugares: 0, Otros: 0, Organizaciones: 0 });

  // Calcular métricas de adjetivos
  const adjectivesTotal = articles.reduce((total, article) => 
    total + (article.metrics?.adjectives.num_adjectives.value || 0), 0);

  // Calcular métricas de fuentes
  const sourceMetrics = articles.reduce((acc, article) => {
    if (article.sources) {
      // Aquí deberías procesar las fuentes según tu estructura de datos
      acc.Links += 2; // Ejemplo, ajusta según tu lógica real
      acc.Dichos += 1;
      acc.Textuales += 3;
      acc.Otros += 4;
    }
    return acc;
  }, { Links: 0, Dichos: 0, Textuales: 0, Otros: 0 });

  // Calcular métricas reales
  const totalArticles = articles.length;
  const totalAuthors = new Set(articles.map(article => article.autor)).size;

  // Por ahora asignamos estados de manera aleatoria pero consistente
  const statusMetrics = articles.reduce((acc, article, index) => {
    // Usar el índice para asignar estados de manera determinística
    if (index % 3 === 0) acc.Revisados++;
    else if (index % 3 === 1) acc.Pendientes++;
    else acc['Sin revisión']++;
    return acc;
  }, {
    Revisados: 0,
    Pendientes: 0,
    'Sin revisión': 0
  });

  const entityTotal = Object.values(entityMetrics).reduce((sum, count) => sum + count, 0);
  const sourceTotal = Object.values(sourceMetrics).reduce((sum, count) => sum + count, 0);

  // Calcular estadísticas de adjetivos
  const adjectivesStats = useMemo(() => {
    const percentages = articles.map(article => 
      (article.metrics?.adjectives.perc_adjectives.value || 0) * 100
    );
    return {
      median: d3.median(percentages).toFixed(1),
      max: d3.max(percentages).toFixed(1),
      total: articles.reduce((sum, article) => 
        sum + (article.metrics?.adjectives.num_adjectives.value || 0), 0
      )
    };
  }, [articles]);

  // Función auxiliar para formatear números
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Entidades */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Entidades</h3>
          <span className="text-cyan-500 text-2xl font-medium">{formatNumber(entityTotal)}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(entityMetrics).map(([type, count]) => {
            const percentage = ((count / entityTotal) * 100).toFixed(1);
            return (
              <div key={type} className="flex flex-col gap-1">
                <FontAwesomeIcon 
                  icon={typeConfig[type].icon} 
                  className={`w-4 h-4 ${typeConfig[type].color}`}
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">{type}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                    <span className="text-xs text-gray-400">({formatNumber(count)})</span>
                  </div>
                </div>
                <div className={`h-1.5 ${typeConfig[type].color.replace('text', 'bg')} rounded-full`}
                     style={{ width: `${percentage}%` }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Adjetivos */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-medium">Adjetivos</h3>
            <FontAwesomeIcon icon={faFont} className="text-purple-500" />
          </div>
          <span className="text-purple-500 text-2xl font-medium">
            {formatNumber(adjectivesStats.total)}
          </span>
        </div>
        <div className="w-full">
          <AdjectivesHistogram articles={articles} />
        </div>
      </div>

      {/* Fuentes */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Fuentes</h3>
          <span className="text-amber-700 text-2xl font-medium">{sourceTotal}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(sourceMetrics).map(([type, count]) => (
            <div key={type} className="flex flex-col gap-1">
              <FontAwesomeIcon 
                icon={sourceConfig[type].icon} 
                className={`w-4 h-4 ${sourceConfig[type].color} mb-1`}
              />
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500">{type}</span>
                <span className="text-sm text-gray-400">{count}</span>
              </div>
              <div className={`w-full ${sourceConfig[type].bgColor} rounded-full h-1.5`}>
                <div 
                  className={`h-full ${sourceConfig[type].color.replace('text', 'bg')} rounded-full`}
                  style={{ width: `${(count / sourceTotal) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas de artículos */}
      <div className="md:col-span-3 bg-white rounded-lg p-6">
        <h3 className="text-xl font-medium mb-6">Estadísticas de artículos</h3>
        <div className="grid grid-cols-5 gap-4 items-stretch">
          {/* Autores y Artículos */}
          {[
            { label: 'Autores', value: totalAuthors, config: statusConfig.Autores },
            { label: 'Artículos', value: totalArticles, config: statusConfig.Artículos }
          ].map(({ label, value, config }) => (
            <div key={label} className="flex flex-col items-center justify-center py-4">
              <FontAwesomeIcon 
                icon={config.icon} 
                className={`w-8 h-8 ${config.color} mb-2`}
              />
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">{formatNumber(value)}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </div>
          ))}

          {/* Estado de revisión con fondo agrupado */}
          <div className="col-span-3 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-3 gap-4 h-full">
              {[
                { label: 'Revisados', value: statusMetrics.Revisados, config: statusConfig.Revisados },
                { label: 'Pendientes', value: statusMetrics.Pendientes, config: statusConfig.Pendientes },
                { label: 'Sin revisión', value: statusMetrics['Sin revisión'], config: statusConfig['Sin revisión'] }
              ].map(({ label, value, config }) => (
                <div key={label} className="flex flex-col items-center justify-center py-4">
                  <FontAwesomeIcon 
                    icon={config.icon} 
                    className={`w-8 h-8 ${config.color} mb-2`}
                  />
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">{formatNumber(value)}</div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 