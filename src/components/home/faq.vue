<template>
	<section class="indicators max-w-[1150px] self-center">
		<h2 class="gradient-text text-4xl font-bold max-w-[472px] mx-auto text-center mb-16 pb-1">Preguntas frecuentes</h2>
		<div class="faq-controller">
			<input id="faq-tab-campers" class="faq-tab-input" type="radio" name="faq-category" checked>
			<input id="faq-tab-sponsors" class="faq-tab-input" type="radio" name="faq-category">

			<div class="faq-tablist" aria-label="Categorías de preguntas frecuentes">
				<label for="faq-tab-campers" class="faq-tab">Campers</label>
				<label for="faq-tab-sponsors" class="faq-tab">Patrocinadores</label>
			</div>

			<div class="faq-panel faq-panel-campers">
				<div class="faq-grid mb-16">
					<details v-for="faq in tabFaqCampersData" :key="`campers-${faq.id}`" class="faq-card">
						<summary class="faq-summary">
							<span class="faq-question">{{ faq.title }}</span>
							<span class="faq-toggle" aria-hidden="true"></span>
						</summary>
						<div class="faq-answer-shell">
							<div class="faq-answer-overflow">
								<div class="faq-answer">
									<span class="faq-answer-label" aria-hidden="true">response.ok</span>
									<p>{{ faq.description }}</p>
								</div>
							</div>
						</div>
					</details>
				</div>
			</div>

			<div class="faq-panel faq-panel-sponsors">
				<div class="faq-grid mb-16">
					<details v-for="faq in tabFaqSponsersData" :key="`sponsors-${faq.id}`" class="faq-card">
						<summary class="faq-summary">
							<span class="faq-question">{{ faq.title }}</span>
							<span class="faq-toggle" aria-hidden="true"></span>
						</summary>
						<div class="faq-answer-shell">
							<div class="faq-answer-overflow">
								<div class="faq-answer">
									<span class="faq-answer-label" aria-hidden="true">response.ok</span>
									<p>{{ faq.description }}</p>
								</div>
							</div>
						</div>
					</details>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const tabFaqCampersData = [
	{
		id: 1,
		title: '¿Qué es Campuslands y cómo funciona?',
		description: 'Campuslands Guatemala es una experiencia educativa intensiva y presencial que forma a jóvenes en programación, inglés y habilidades profesionales para integrarse al sector tecnológico. El aprendizaje práctico, la disciplina y el acompañamiento de mentores son parte central del proceso.'
	},
	{
		id: 2,
		title: '¿Cuánto tiempo dura el programa de Campuslands?',
		description: 'El programa tiene una duración de 10 meses, con un enfoque intensivo de aprendizaje que maximiza tu formación en un tiempo reducido. Para ajustarnos a las necesidades de los estudiantes, Campuslands ofrece dos jornadas: una en horario matutino de 6:00 a.m. a 2:00 p.m. y otra en horario vespertino de 2:00 p.m. a 10:00 p.m., dependiendo de la disponibilidad. Con estas opciones, buscamos que puedas adaptarte al horario que mejor se acomode a tus necesidades sin comprometer la intensidad del programa. Por favor solicita la información vigente al equipo de admisiones de Campuslands Guatemala.'
	},
	{
		id: 3,
		title: '¿Qué requisitos necesito para inscribirme en Campuslands?',
		description: 'En Campuslands, creemos que más allá de los conocimientos previos, las cualidades más importantes que buscamos en nuestros estudiantes son la actitud, la lógica y la disciplina. Valoramos profundamente la actitud positiva y el compromiso con el aprendizaje, la capacidad de razonamiento lógico y la disciplina para afrontar los desafíos del programa intensivo. Si posees estas cualidades, tienes todo lo necesario para embarcarte en esta experiencia transformadora.'
	},
	{
		id: 4,
		title: '¿Cuál es el costo del programa y existen facilidades de pago?',
		description: 'La inversión y las alternativas de apoyo dependen de la convocatoria vigente en Guatemala. Te invitamos a agendar una cita en el campus para recibir información actualizada sobre requisitos, costos, becas y facilidades de pago disponibles.'
	},
	{
		id: 5,
		title: '¿Qué materias o habilidades voy a aprender en Campuslands?',
		description: 'En Campuslands, aprenderás programación avanzada, integrarás la inteligencia artificial como asistente para desarrollar código y fortalecerás tu inglés y las habilidades adaptativas esenciales para el mundo laboral. El plan de estudios está diseñado para proporcionarte competencias técnicas en desarrollo de software y habilidades de comunicación en inglés que te abrirán puertas en el mercado global. Además, cultivamos habilidades interpersonales como trabajo en equipo, adaptabilidad y liderazgo, asegurándonos de que seas un profesional completo y preparado para enfrentar los desafíos del mercado.'
	},
	{
		id: 6,
		title: '¿Qué nivel de inglés necesito para ser admitido?',
		description: 'No se requiere un nivel avanzado de inglés para ingresar a Campuslands. Aquí, te ayudaremos a mejorar tus habilidades en el idioma desde lo básico hasta un nivel que te permita destacar en el ámbito laboral. Sabemos que el inglés es fundamental en la tecnología, y por eso incluimos el aprendizaje del idioma en el programa, acompañándote en cada paso para que te sientas seguro y preparado.'
	},
	{
		id: 7,
		title: '¿Cómo me ayudará Campuslands a conseguir empleo después de graduarme?',
		description: 'Nuestro modelo combina formación técnica, inglés y habilidades profesionales con preparación para procesos de selección y conexión con empresas. El equipo acompaña a los Campers en el desarrollo de un perfil competitivo; los resultados laborales dependen del desempeño de cada persona y de las condiciones del mercado.'
	},
	{
		id: 8,
		title: '¿Cuál es el retorno de inversión del programa?',
		description: 'El retorno depende del desempeño del estudiante, las oportunidades disponibles y las condiciones del mercado laboral. Nuestro objetivo es fortalecer habilidades técnicas y profesionales que mejoren las posibilidades de acceder al sector tecnológico.'
	},
	{
		id: 9,
		title: '¿Cuánto ganan en promedio los graduados de Campuslands?',
		description: 'Los salarios varían según el rol, la empresa, la experiencia y las condiciones del mercado. Campuslands prepara perfiles para posiciones iniciales en tecnología, pero no promete una remuneración específica.'
	},
	{
		id: 10,
		title: '¿Cuántas horas al día tendré que estudiar?',
		description: 'El programa exige dedicación constante y disponibilidad para una formación intensiva. Antes de inscribirte, confirma con admisiones la jornada y la carga horaria de la convocatoria vigente.'
	},
	{
		id: 11,
		title: '¿El programa es solo para personas con conocimientos previos en tecnología?',
		description: 'No, Campuslands está diseñado para personas sin experiencia previa en tecnología. Nuestro enfoque es inclusivo y accesible para todos los jóvenes que deseen aprender y superarse. Solo necesitas ganas de aprender, compromiso y apertura para enfrentar los retos de una formación intensiva.'
	},
	{
		id: 12,
		title: '¿Qué diferencia a Campuslands de una universidad o instituto tradicional?',
		description: 'Campuslands ofrece un modelo intensivo, presencial y práctico enfocado en programación, inteligencia artificial, inglés y habilidades profesionales. No sustituye una carrera universitaria; es una ruta de formación distinta, orientada a desarrollar competencias para el sector tecnológico.'
	},
	{
		id: 13,
		title: '¿Puedo estudiar y trabajar al mismo tiempo mientras hago el programa?',
		description: 'Por la intensidad del programa, combinarlo con un trabajo puede ser un reto. Es difícil pero no imposible; es manejar tiempos, sacrificio y disciplina. Consulta la jornada vigente con admisiones y evalúa tu disponibilidad antes de iniciar el proceso.'
	},
	{
		id: 14,
		title: '¿El programa es presencial o puedo tomarlo en línea?',
		description: 'Campuslands es 100% presencial porque creemos que el aprendizaje inmersivo en un ambiente físico es fundamental para tu desarrollo. La interacción directa con mentores, compañeros y el ambiente del campus enriquece tu experiencia y garantiza un aprendizaje más profundo y efectivo.'
	},
	{
		id: 15,
		title: '¿Qué apoyo recibo durante el programa si tengo dificultades?',
		description: 'En Campuslands, contarás con un equipo de mentores, instructores y psicólogos que te acompañarán en cada etapa. Si encuentras dificultades, nuestro equipo estará disponible para ayudarte a superar cualquier obstáculo, asegurándonos de que avances con confianza hacia tus objetivos.'
	},
	{
		id: 16,
		title: '¿Hay un proceso de selección para ingresar al programa?',
		description: 'Sí, en Campuslands contamos con un proceso de selección riguroso. Los candidatos realizan pruebas virtuales y presenciales, y, una vez superada esta etapa, participan en una fase intensiva llamada “Sandbox”. Durante dos semanas, se evalúan habilidades en lógica, actitud y disciplina en un entorno intensivo y presencial con mentores e instructores. Esta inversión en el proceso de selección asegura que los seleccionados están comprometidos y preparados para aprovechar al máximo el programa.'
	},
	{
		id: 17,
		title: '¿Campuslands ofrece becas o apoyos financieros?',
		description: 'Las opciones de apoyo pueden variar entre convocatorias. Consulta directamente con admisiones para conocer los requisitos, la disponibilidad y las condiciones vigentes en Guatemala.'
	},
	{
		id: 18,
		title: '¿Puedo visitar el campus antes de inscribirme?',
		description: '¡Claro! Te invitamos a agendar una visita para que puedas conocer el campus, vivir el ambiente de Campuslands y entender de cerca nuestro enfoque intensivo de formación. Esta experiencia es ideal para que veas de primera mano cómo podemos ayudarte a construir tu futuro.'
	},
	{
		id: 19,
		title: '¿Cómo es la comunidad de estudiantes en Campuslands?',
		description: 'Campuslands es más que un centro de formación; es una comunidad de jóvenes talentosos que se apoyan mutuamente. Aquí encontrarás compañeros que comparten tus mismas metas de crecimiento y éxito, creando una red de apoyo y colaboración que te acompañará en cada paso del camino.'
	},
	{
		id: 20,
		title: '¿Qué tipo de trabajos puedo obtener al graduarme de Campuslands?',
		description: 'Al finalizar el programa, estarás capacitado para roles como desarrollador de software, analista de datos, soporte técnico y otros puestos demandados en tecnología. Campuslands te abre las puertas a empleos que no solo ofrecen buenas remuneraciones, sino también oportunidades de crecimiento y desarrollo en un sector en constante expansión.'
	}
]

const tabFaqSponsersData = [
	{
		id: 1,
		title: "¿Qué significa ser patrocinador de Campuslands?",
		description: "Ser patrocinador de Campuslands significa apoyar el sueño de un joven con talento pero con recursos limitados. Tu aporte económico permite que estos jóvenes accedan a un entrenamiento especializado en desarrollo de software, inglés y habilidades socioemocionales. Este apoyo no solo transforma la vida del joven, sino que también impacta positivamente a su familia, su entorno y la industria tecnológica en general."
	},
	{
		id: 2,
		title: "¿Cómo funciona el modelo de patrocinio en Campuslands?",
		description: "El modelo de patrocinio permite a personas o empresas financiar la formación de jóvenes durante su proceso de entrenamiento en Campuslands. Los patrocinadores realizan una contribución económica que cubre los costos de formación, mientras Campuslands se encarga de entrenar y acompañar al joven en habilidades técnicas, humanas y de idioma. Al final, el objetivo es que el joven consiga un empleo de calidad en la industria tecnológica."
	},
	{
		id: 3,
		title: "¿A quiénes se patrocina en Campuslands?",
		description: "Se patrocina a jóvenes de niveles socioeconómicos C, C- y D con gran potencial y recursos económicos limitados. Son personas con deseos de superación, pasión por la tecnología y compromiso con su aprendizaje."
	},
	{
		id: 4,
		title: "¿Cuál es el costo de patrocinar a un estudiante?",
		description: "El costo puede variar dependiendo de la duración y el alcance del entrenamiento. Sin embargo, Campuslands se encarga de optimizar cada recurso para garantizar la mejor educación posible. Si estás interesado en patrocinar, puedes solicitar información específica para conocer el costo exacto y el plan de pago más adecuado para ti."
	},
	{
		id: 5,
		title: "¿Cuánto tiempo dura el patrocinio?",
		description: "La duración y el alcance del patrocinio dependen del plan acordado y de la convocatoria vigente. El equipo de Campuslands Guatemala puede compartir el cronograma y las condiciones aplicables antes de formalizar el apoyo."
	},
	{
		id: 6,
		title: "¿Cómo se mide el impacto de mi patrocinio?",
		description: "Campuslands mide el impacto a través de indicadores de progreso y empleabilidad. Como patrocinador, recibirás actualizaciones sobre el avance del joven, sus logros y, en muchos casos, el resultado final: su inserción laboral en una empresa tecnológica. De esta forma, podrás ver de forma tangible cómo tu apoyo transforma vidas."
	},
	{
		id: 7,
		title: "¿Cómo puedo hacer seguimiento al estudiante que estoy patrocinando?",
		description: "Campuslands se encarga de mantener una comunicación abierta y transparente. A través de informes periódicos, podrás conocer el progreso del estudiante, sus logros y el impacto que estás generando. Además, en algunos casos, se pueden organizar encuentros o eventos donde los patrocinadores pueden conocer a los jóvenes que están apoyando."
	},
	{
		id: 8,
		title: "¿Puedo patrocinar a más de un estudiante al mismo tiempo?",
		description: "¡Por supuesto! Puedes patrocinar a tantos estudiantes como desees. Muchas empresas e individuos ven esto como una forma de crear un impacto aún mayor. Cada estudiante representa una oportunidad de transformar una vida, y con cada patrocinio adicional, la posibilidad de cambiar realidades se multiplica."
	},
	{
		id: 9,
		title: "¿Cuáles son los requisitos para ser patrocinador?",
		description: "No existen requisitos estrictos. Solo se necesita la disposición para apoyar la educación de jóvenes y el compromiso de realizar las contribuciones económicas acordadas. Tanto personas naturales como empresas pueden ser patrocinadores."
	}
]
</script>

<style scoped>
.faq-controller {
	position: relative;
}

.faq-tab-input {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

.faq-tablist {
	display: flex;
	width: min(100%, 32rem);
	gap: 0.625rem;
	margin: 0 auto 2.5rem;
	padding: 0.5rem;
	border: 1px solid #fff;
	border-radius: 999px;
	background: #00aa80;
}

.faq-tab {
	display: flex;
	width: 50%;
	min-height: 2.75rem;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	background: #07102b;
	color: #fff;
	font-weight: 600;
	cursor: pointer;
	transition: background 250ms ease, color 250ms ease, transform 250ms ease;
}

#faq-tab-campers:checked ~ .faq-tablist label[for="faq-tab-campers"],
#faq-tab-sponsors:checked ~ .faq-tablist label[for="faq-tab-sponsors"] {
	background: #0076b7;
}

.faq-tab-input:focus-visible ~ .faq-tablist {
	outline: 2px solid #57bbff;
	outline-offset: 4px;
}

.faq-panel-sponsors {
	display: none;
}

#faq-tab-sponsors:checked ~ .faq-panel-campers {
	display: none;
}

#faq-tab-sponsors:checked ~ .faq-panel-sponsors {
	display: block;
}

.faq-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem 1.5rem;
}

.faq-card {
	position: relative;
	align-self: start;
	border: 1px solid transparent;
	border-bottom-color: rgba(87, 187, 255, 0.3);
	border-radius: 1.25rem;
	background: rgba(7, 16, 43, 0);
	overflow: hidden;
	transition:
		background 400ms ease,
		border-color 400ms ease,
		box-shadow 500ms ease,
		transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-card > summary {
	list-style: none;
}

.faq-card > summary::-webkit-details-marker {
	display: none;
}

.faq-card::before {
	content: '';
	position: absolute;
	inset: 0 auto auto 0;
	width: 100%;
	height: 2px;
	background: linear-gradient(90deg, transparent, #2caaff, #00aa80, transparent);
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 650ms cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-card[open] {
	border-color: rgba(87, 187, 255, 0.22);
	background: linear-gradient(135deg, rgba(44, 170, 255, 0.1), rgba(0, 170, 128, 0.055));
	box-shadow: 0 18px 55px rgba(0, 5, 81, 0.2), inset 0 1px rgba(255, 255, 255, 0.04);
	transform: translateY(-2px);
}

.faq-card[open]::before {
	transform: scaleX(1);
}

.faq-summary {
	position: relative;
	display: flex;
	width: 100%;
	min-height: 5.25rem;
	align-items: center;
	justify-content: space-between;
	gap: 1.25rem;
	padding: 1.15rem 1.25rem;
	text-align: left;
	font-size: 1.125rem;
	font-weight: 600;
	line-height: 1.4;
	cursor: pointer;
}

.faq-summary:focus-visible {
	outline: 2px solid #57bbff;
	outline-offset: -4px;
	border-radius: 1rem;
}

.faq-question {
	transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1), color 300ms ease;
}

.faq-card[open] .faq-question {
	color: #b0f7e6;
	transform: translateX(0.3rem);
}

.faq-toggle {
	position: relative;
	display: grid;
	width: 2.25rem;
	height: 2.25rem;
	flex: 0 0 2.25rem;
	place-items: center;
	border: 1px solid rgba(0, 209, 160, 0.38);
	border-radius: 999px;
	background: rgba(0, 170, 128, 0.08);
	box-shadow: 0 0 0 0 rgba(0, 209, 160, 0);
	transition:
		transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
		background 300ms ease,
		box-shadow 450ms ease;
}

.faq-toggle::before,
.faq-toggle::after {
	content: '';
	position: absolute;
	width: 0.95rem;
	height: 2px;
	border-radius: 999px;
	background: #00d1a0;
	transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease;
}

.faq-toggle::after {
	transform: rotate(90deg);
}

.faq-card[open] .faq-toggle {
	background: #00aa80;
	box-shadow: 0 0 0 0.4rem rgba(0, 209, 160, 0.09), 0 0 1.6rem rgba(44, 170, 255, 0.22);
	transform: rotate(180deg);
}

.faq-card[open] .faq-toggle::before,
.faq-card[open] .faq-toggle::after {
	background: #07102b;
}

.faq-card[open] .faq-toggle::after {
	transform: rotate(90deg) scaleX(0);
}

.faq-answer-shell {
	display: grid;
	grid-template-rows: 0fr;
	opacity: 0;
	filter: blur(5px);
	transform: translateY(-0.6rem);
	transition:
		grid-template-rows 600ms cubic-bezier(0.16, 1, 0.3, 1),
		opacity 320ms ease,
		filter 400ms ease,
		transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-card[open] .faq-answer-shell {
	grid-template-rows: 1fr;
	opacity: 1;
	filter: blur(0);
	transform: translateY(0);
}

.faq-answer-overflow {
	min-height: 0;
	overflow: hidden;
}

.faq-answer {
	position: relative;
	margin: 0 1.25rem;
	padding: 1.15rem 0 1.4rem;
	border-top: 1px solid rgba(87, 187, 255, 0.2);
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.9);
}

.faq-answer-label {
	display: block;
	margin-bottom: 0.55rem;
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	font-size: 0.68rem;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: #57bbff;
}

@media (hover: hover) {
	.faq-card:not([open]):hover {
		border-color: rgba(87, 187, 255, 0.2);
		background: rgba(44, 170, 255, 0.035);
		transform: translateY(-2px);
	}

	.faq-card:not([open]):hover .faq-toggle {
		box-shadow: 0 0 1.2rem rgba(0, 209, 160, 0.2);
		transform: rotate(90deg);
	}
}

@media (max-width: 767px) {
	.faq-grid {
		grid-template-columns: 1fr;
		gap: 0.8rem;
		padding-inline: 0.75rem;
	}

	.faq-summary {
		min-height: 4.75rem;
		padding: 1rem;
		font-size: 1rem;
	}

	.faq-answer {
		margin-inline: 1rem;
		padding: 1rem 0 1.2rem;
		font-size: 0.95rem;
		line-height: 1.65;
	}

	.faq-toggle {
		width: 2rem;
		height: 2rem;
		flex-basis: 2rem;
	}
}

@media (prefers-reduced-motion: reduce) {
	.faq-card,
	.faq-card::before,
	.faq-question,
	.faq-toggle,
	.faq-toggle::before,
	.faq-toggle::after,
	.faq-answer-shell {
		transition-duration: 0.01ms !important;
	}
}
</style>
