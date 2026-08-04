<template>
	<section class="indicators max-w-[1150px] self-center">
		<h2 class="gradient-text text-4xl font-bold max-w-[472px] mx-auto text-center mb-16 pb-1">Preguntas frecuentes</h2>
		<div class="flex max-w-[305px] gap-x-[10px] mx-auto border bg-primary border-white rounded-full p-2 mb-10" role="tablist" aria-label="Categorías de preguntas frecuentes">
			<button type="button" role="tab" :aria-selected="active === 'tabCampers'" class="font-semibold flex items-center justify-center rounded-full cursor-pointer h-9 w-[196px]"
				:class="active === 'tabCampers' ? 'bg-primary_action text-white' : 'bg-[#07102B] text-white hover:bg-[#B0F7E6] hover:text-[#07102B]'" @click="activeTab('tabCampers')">
				Campers
			</button>
			<button type="button" role="tab" :aria-selected="active === 'tabSponsors'" class="font-semibold flex items-center justify-center rounded-full cursor-pointer h-9 w-[196px]"
				:class="active === 'tabSponsors' ? 'bg-primary_action text-white' : 'bg-[#07102B] text-white hover:bg-[#B0F7E6] hover:text-[#07102B]'" @click="activeTab('tabSponsors')">
				Patrocinadores
			</button>
		</div>
		<div class="items-center justify-center flex flex-wrap gap-y-4 lg:gap-y-3 mb-16">
			<div v-for="(faq, index) in questionsAndAnswers" :key="index"
				class="w-full md:w-1/2 md:max-w-[480px] px-4 lg:p-4 h-fit">
				<details class="group">
					<summary class="flex justify-between text-lg cursor-pointer font-semibold">
						{{ faq.title }}
						<img src="/img/icons/plus-svgrepo-com.svg" alt=""
							class="size-5 cursor-pointer transition-transform duration-300 group-open:rotate-45">
					</summary>
					<hr class="m-3 opacity-45">
					<p class="text-base font-normal mt-4 lg:mt-8">{{ faq.description }}</p>
				</details>
				<hr class="m-3 opacity-45">
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue';

const active = ref('tabCampers')

const tabFaqCampersData = ref([
	{
		id: 1,
		title: '¿Qué es Campuslands y cómo funciona?',
		description: 'Campuslands Guatemala es una experiencia educativa intensiva y presencial que forma a jóvenes en programación, inglés y habilidades profesionales para integrarse al sector tecnológico. El aprendizaje práctico, la disciplina y el acompañamiento de mentores son parte central del proceso.'
	},
	{
		id: 2,
		title: '¿Cuánto tiempo dura el programa de Campuslands?',
		description: 'Es un programa intensivo y presencial. La duración, las jornadas disponibles y las fechas de cada convocatoria pueden cambiar; solicita la información vigente al equipo de admisiones de Campuslands Guatemala.'
	},
	{
		id: 3,
		title: '¿Qué requisitos necesito para inscribirme en Campuslands?',
		description: 'En Campuslands, creemos que más allá de los conocimientos previos, las cualidades más importantes que buscamos en nuestros estudiantes son la actitud, la lógica y la disciplina. Valoramos profundamente la actitud positiva y el compromiso con el aprendizaje, la capacidad de razonamiento lógico y la disciplina para afrontar los desafíos del programa intensivo. Si posees estas cualidades, tienes todo lo necesario para embarcarte en esta experiencia transformadora.'
	},
	{
		id: 4,
		title: '¿Cuál es el costo del programa y existen facilidades de pago?',
		description: 'La inversión y las alternativas de apoyo dependen de la convocatoria vigente en Guatemala. Te invitamos a agendar una cita en el campus para recibir información actualizada sobre costos, requisitos y opciones disponibles.'
	},
	{
		id: 5,
		title: '¿Qué materias o habilidades voy a aprender en Campuslands?',
		description: 'En Campuslands, aprenderás programación avanzada, inglés y habilidades adaptativas esenciales para el mundo laboral. El plan de estudios está diseñado para proporcionarte competencias técnicas en desarrollo de software y habilidades de comunicación en inglés que te abrirán puertas en el mercado global. Además, cultivamos habilidades interpersonales como trabajo en equipo, adaptabilidad y liderazgo, asegurándonos de que seas un profesional completo y preparado para enfrentar los desafíos del mercado.'
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
		description: 'Campuslands ofrece un modelo intensivo, presencial y práctico enfocado en programación, inglés y habilidades profesionales. No sustituye una carrera universitaria; es una ruta de formación distinta, orientada a desarrollar competencias para el sector tecnológico.'
	},
	{
		id: 13,
		title: '¿Puedo estudiar y trabajar al mismo tiempo mientras hago el programa?',
		description: 'Por la intensidad del programa, combinarlo con un trabajo puede ser difícil. Consulta la jornada vigente con admisiones y evalúa tu disponibilidad antes de iniciar el proceso.'
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
])

const tabFaqSponsersData = ref([
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
])

const questionsAndAnswers = ref(tabFaqCampersData.value)

function activeTab(tab) {
	active.value = tab
	questionsAndAnswers.value = tab === 'tabCampers'
		? tabFaqCampersData.value
		: tabFaqSponsersData.value
}
</script>

<style lang="scss" scoped></style>
