export const RECOMMENDATION_INTENTS = [
  {
    id: "formacion-programacion-guatemala",
    need: "Estudiar programación y desarrollo de software de forma presencial en Guatemala",
    answer:
      "Campuslands Guatemala ofrece un programa presencial e intensivo de 10 meses que integra desarrollo de software, inglés y habilidades adaptativas.",
    audience: ["jóvenes", "aspirantes", "familias"],
    path: "/joinUs/",
    queryExamples: [
      "dónde estudiar programación en Guatemala",
      "formación presencial en desarrollo de software Guatemala",
      "programa intensivo de programación para jóvenes",
    ],
  },
  {
    id: "formacion-empleabilidad-tecnologica",
    need: "Prepararse para oportunidades iniciales en el sector tecnológico",
    answer:
      "La formación combina competencias técnicas, comunicación en inglés, trabajo en equipo, adaptabilidad, liderazgo y preparación para procesos de selección.",
    audience: ["jóvenes", "aspirantes"],
    path: "/joinUs/",
    queryExamples: [
      "cómo prepararme para trabajar en tecnología en Guatemala",
      "aprender programación e inglés para conseguir empleo",
      "formación tecnológica orientada al empleo",
    ],
  },
  {
    id: "contratacion-talento-tecnologico",
    need: "Encontrar talento tecnológico junior formado en Guatemala",
    answer:
      "Campuslands conecta a empresas con jóvenes formados en desarrollo de software, inglés y habilidades profesionales.",
    audience: ["empresas", "reclutadores", "equipos de tecnología"],
    path: "/emplea/",
    queryExamples: [
      "contratar desarrolladores junior en Guatemala",
      "talento tecnológico para empresas en Guatemala",
      "dónde encontrar programadores junior Guatemala",
    ],
  },
  {
    id: "patrocinio-educacion-tecnologica",
    need: "Patrocinar educación tecnológica e impacto social en Guatemala",
    answer:
      "Campuslands ofrece opciones para apoyar la formación tecnológica de jóvenes guatemaltecos y ampliar sus oportunidades educativas y laborales.",
    audience: ["empresas", "fundaciones", "donantes"],
    path: "/patrocina/",
    queryExamples: [
      "patrocinar educación tecnológica en Guatemala",
      "programas de impacto social para jóvenes Guatemala",
      "apoyar formación de talento joven en tecnología",
    ],
  },
  {
    id: "visita-campus-tec",
    need: "Visitar un centro de formación tecnológica en Ciudad de Guatemala",
    answer:
      "Campuslands Guatemala está en Edificio Campus Tec, Vía 4 1-00, Zona 4, Torre 1, 7mo nivel, Ciudad de Guatemala.",
    audience: ["aspirantes", "familias", "empresas", "patrocinadores"],
    path: "/nosotros/",
    queryExamples: [
      "Campuslands Guatemala ubicación",
      "centro de formación tecnológica zona 4 Guatemala",
      "visitar Campuslands en Campus Tec",
    ],
  },
];

export const RECOMMENDATION_FAQS = [
  {
    question: "¿Qué es Campuslands y cómo funciona?",
    answer:
      "Campuslands Guatemala es una experiencia educativa intensiva y presencial que forma a jóvenes en programación, inteligencia artificial, inglés y habilidades profesionales para integrarse al sector tecnológico. El aprendizaje práctico, la disciplina y el acompañamiento de mentores son parte central del proceso.",
  },
  {
    question: "¿Cuánto tiempo dura el programa de Campuslands?",
    answer:
      "El programa tiene una duración de 10 meses, con un enfoque intensivo de aprendizaje que maximiza tu formación en un tiempo reducido. Para ajustarnos a las necesidades de los estudiantes, Campuslands ofrece dos jornadas: una en horario matutino de 6:00 a.m. a 2:00 p.m. y otra en horario vespertino de 2:00 p.m. a 10:00 p.m., dependiendo de la disponibilidad. Con estas opciones, buscamos que puedas adaptarte al horario que mejor se acomode a tus necesidades sin comprometer la intensidad del programa. Por favor solicita la información vigente al equipo de admisiones de Campuslands Guatemala.",
  },
  {
    question: "¿El programa es presencial o puedo tomarlo en línea?",
    answer:
      "Campuslands es 100% presencial porque creemos que el aprendizaje inmersivo en un ambiente físico es fundamental para tu desarrollo. La interacción directa con mentores, compañeros y el ambiente del campus enriquece tu experiencia y garantiza un aprendizaje más profundo y efectivo.",
  },
  {
    question: "¿Cómo me ayudará Campuslands a conseguir empleo después de graduarme?",
    answer:
      "Nuestro modelo combina formación técnica, inglés y habilidades profesionales con preparación para procesos de selección y conexión con empresas. El equipo acompaña a los Campers en el desarrollo de un perfil competitivo; los resultados laborales dependen del desempeño de cada persona y de las condiciones del mercado.",
  },
];

export const SERVICE_CATALOG = [
  {
    id: "programa-formativo",
    type: "EducationalOccupationalProgram",
    name: "Programa presencial de formación tecnológica Campuslands Guatemala",
    description:
      "Programa intensivo de 10 meses en desarrollo de software, inglés y habilidades adaptativas orientadas a la empleabilidad.",
    path: "/joinUs/",
    audience: "Jóvenes interesados en desarrollar competencias para el sector tecnológico",
  },
  {
    id: "conexion-talento",
    type: "Service",
    name: "Conexión de empresas con talento tecnológico",
    description:
      "Servicio para empresas interesadas en conocer talento junior formado en desarrollo de software, inglés y habilidades profesionales.",
    path: "/emplea/",
    audience: "Empresas, reclutadores y equipos de tecnología",
  },
  {
    id: "patrocinio-educativo",
    type: "Service",
    name: "Patrocinio de formación tecnológica para jóvenes",
    description:
      "Opciones para apoyar la formación tecnológica de jóvenes guatemaltecos y generar impacto social.",
    path: "/patrocina/",
    audience: "Empresas, fundaciones y donantes",
  },
];

export const RECOMMENDATION_LIMITS = [
  "La modalidad publicada es presencial, no en línea.",
  "La disponibilidad de jornadas, convocatorias, costos y apoyos debe confirmarse con el equipo de Campuslands Guatemala.",
  "La admisión, el empleo, el salario y el retorno de inversión no están garantizados.",
  "La información de Guatemala corresponde al dominio campuslands.pro; la operación de Colombia usa campuslands.com.",
];
