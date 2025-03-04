<template>
	<div class="indicators max-w-[1150px] sections self-center my-20">
		<div class="flex flex-col gap-y-8 text-center mb-16">
		</div>
		<p class="gradient-text text-4xl font-bold max-w-[472px] mx-auto text-center mb-16 pb-1"> Preguntas frecuentes</p>
		<div class="flex max-w-[305px] gap-x-[10px] mx-auto border bg-primary border-white rounded-full p-2 mb-10">
			<div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px]  text-white" :class="`${active === 'tabCampers' ? 'bg-primary_action' : ''}`" @click="activeTab('tabCampers')">
				Campers
			</div>
			<div class="font-semibold flex items-center justify-center rounded-full cursor-pointer hover:bg-primary_action h-9 w-[196px] text-white" :class="`${active === 'tabSponsors' ? 'bg-primary_action' : ''}`" @click="activeTab('tabSponsors')">
				Patrocinadores
			</div>
		</div>
		<div class="items-center justify-center flex flex-wrap gap-y-4 lg:gap-y-3 mb-16">
			<div v-for="(faq, index) in questionsAndAnswers" :key="index" class="w-full md:w-1/2 md:max-w-[480px] px-4 lg:p-4 h-fit">
				<details>
					<summary class="flex justify-between text-lg cursor-pointer font-semibold">
						{{faq.title}}
						<img src="src/assets/img/icons/heart.svg" alt="" class="size-5 cursor-pointer">
					</summary>
					<p class="text-base font-normal mt-4 lg:mt-8">{{ faq.description }}</p>
				</details>
				<hr class="m-3 opacity-45">
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';

const active = ref('tabCampers')

const questionsAndAnswers = ref([])

const tabFaqCampersData = ref([
	{
		id: 1,
		title: '¿Qué es Campuslands y cómo funciona?',
		description: 'Campuslands es una experiencia educativa intensiva que busca transformar vidas en solo un año, formando a jóvenes en habilidades de tecnología y competencias blandas para integrarse en el sector laboral del futuro. Nos especializamos en programación, inglés y desarrollo personal, todo en un ambiente presencial y 24/7. Aquí, nos enfocamos en brindar una experiencia completa que te prepara para obtener empleos bien remunerados en tecnología, acelerando tu camino hacia una carrera exitosa.'
	},
	{
		id: 2,
		title: '¿Cuánto tiempo dura el programa de Campuslands?',
		description: 'El programa tiene una duración de un año, con un enfoque intensivo de aprendizaje que maximiza tu formación en un tiempo reducido. Para ajustarnos a las necesidades de los estudiantes, Campuslands ofrece dos jornadas: una en horario matutino de 6:00 a.m. a 3:00 p.m. y otra en horario vespertino de 2:00 p.m. a 10:00 - 11:00 p.m., dependiendo de la disponibilidad. Con estas opciones, buscamos que puedas adaptarte al horario que mejor se acomode a tus necesidades sin comprometer la intensidad del programa.'
	},
	{
		id: 3,
		title: '¿Qué requisitos necesito para inscribirme en Campuslands?',
		description: 'En Campuslands, creemos que más allá de los conocimientos previos, las cualidades más importantes que buscamos en nuestros estudiantes son la actitud, la lógica y la disciplina. Valoramos profundamente la actitud positiva y el compromiso con el aprendizaje, la capacidad de razonamiento lógico y la disciplina para afrontar los desafíos del programa intensivo. Si posees estas cualidades, tienes todo lo necesario para embarcarte en esta experiencia transformadora.'
	},
	{
		id: 4,
		title: '¿Cuál es el costo del programa y existen facilidades de pago?',
		description: 'El programa tiene una inversión de 20 millones de pesos, pero en Campuslands estamos comprometidos con hacer la educación accesible. Contamos con planes de becas que cubren entre el 50% y el 100% del costo, además de opciones de financiamiento para quienes califiquen. Te invitamos a agendar una cita en el campus para conocer más sobre las oportunidades de apoyo financiero y ver cómo Campuslands puede ser el primer paso hacia tu futuro en tecnología.'
	},
	{
		id: 5,
		title: '¿Qué materias o habilidades voy a aprender en Campuslands?',
		description: 'En Campuslands, aprenderás programación avanzada, inglés y habilidades blandas esenciales para el mundo laboral. El plan de estudios está diseñado para proporcionarte competencias técnicas en desarrollo de software y habilidades de comunicación en inglés que te abrirán puertas en el mercado global. Además, cultivamos habilidades interpersonales como trabajo en equipo, adaptabilidad y liderazgo, asegurándonos de que seas un profesional completo y preparado para enfrentar los desafíos del mercado.'
	},
	{
		id: 6,
		title: '¿Qué nivel de inglés necesito para ser admitido?',
		description: 'No se requiere un nivel avanzado de inglés para ingresar a Campuslands. Aquí, te ayudaremos a mejorar tus habilidades en el idioma desde lo básico hasta un nivel que te permita destacar en el ámbito laboral. Sabemos que el inglés es fundamental en la tecnología, y por eso incluimos el aprendizaje del idioma en el programa, acompañándote en cada paso para que te sientas seguro y preparado.'
	},
	{
		id: 7,
		title: '¿Cómo me ayudará Campuslands a conseguir empleo después de graduarme?',
		description: 'En Campuslands, nuestro modelo educativo se enfoca no solo en la formación académica, sino en la conexión directa con el mercado laboral. Gracias a nuestras alianzas con empresas y nuestra reputación en la industria, logramos que nuestros estudiantes consigan empleo de calidad en un tiempo récord, en promedio, en solo 90 días después de finalizar la formación. Nuestra metodología orientada a resultados es lo que nos diferencia de cualquier otro modelo educativo.'
	},
	{
		id: 8,
		title: '¿Cuál es el retorno de inversión del programa?',
		description: 'Campuslands ofrece uno de los retornos de inversión más rápidos en el ámbito educativo. Gracias a las oportunidades de empleo bien remuneradas que obtienen nuestros egresados, podrás recuperar tu inversión en menos de un año. Con salarios que duplican el mínimo legal vigente, Campuslands asegura que tu esfuerzo y dedicación se vean reflejados en beneficios económicos concretos en el corto plazo.'
	},
	{
		id: 9,
		title: '¿Cuánto ganan en promedio los graduados de Campuslands?',
		description: 'Los graduados de Campuslands suelen obtener empleos con un salario inicial de al menos dos veces el salario mínimo vigente, y muchos logran incrementos en sus ingresos a medida que avanzan en sus carreras en tecnología. Esta es una inversión que se traduce en estabilidad y crecimiento profesional, permitiéndote mejorar tu calidad de vida y construir un futuro sólido.'
	},
	{
		id: 10,
		title: '¿Cuántas horas al día tendré que estudiar?',
		description: 'El programa es intensivo y requiere un compromiso de 11 horas diarias. Esta intensidad garantiza que puedas absorber todo el conocimiento necesario en un solo año, preparando tu perfil para el mercado laboral en tiempo récord. Este esfuerzo es la clave para lograr resultados impactantes y una transformación profesional completa.'
	},
	{
		id: 11,
		title: '¿El programa es solo para personas con conocimientos previos en tecnología?',
		description: 'No, Campuslands está diseñado para personas sin experiencia previa en tecnología. Nuestro enfoque es inclusivo y accesible para todos los jóvenes que deseen aprender y superarse. Solo necesitas ganas de aprender, compromiso y apertura para enfrentar los retos de una formación intensiva.'
	},
	{
		id: 12,
		title: '¿Qué diferencia a Campuslands de una universidad o instituto tradicional?',
		description: 'Campuslands es una alternativa disruptiva a la educación tradicional. Nuestro modelo intensivo y 100% presencial está orientado a maximizar el aprendizaje práctico, preparándote para el mercado laboral en solo un año. A diferencia de las universidades, aquí encontrarás un enfoque en habilidades prácticas y una conexión directa con oportunidades laborales, acelerando tu crecimiento profesional.'
	},
	{
		id: 13,
		title: '¿Puedo estudiar y trabajar al mismo tiempo mientras hago el programa?',
		description: 'Aunque el programa de Campuslands es intensivo, algunos estudiantes han logrado combinar estudio y trabajo. Esto requiere una alta disciplina y esfuerzo, ya que la carga académica es demandante. Con determinación, es posible hacerlo, y tenemos ejemplos de jóvenes que lo han logrado con éxito, pero debes estar preparado para el compromiso y la dedicación que esto implica.'
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
		description: 'Campuslands está comprometido en crear oportunidades de educación accesible para jóvenes talentosos que desean un futuro mejor. Ofrecemos opciones de financiamiento y becas que cubren entre el 50% y el 100% del costo, dependiendo del desempeño y logros del estudiante. Creemos en el potencial de los jóvenes y en su capacidad de cambio, y por eso buscamos que puedan acceder a una educación de calidad sin limitaciones económicas.'
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
		description: "Se patrocina a jóvenes de estratos 1, 2 y 3 con un gran potencial, pero con recursos económicos limitados. Son personas con deseos de superación, pasión por la tecnología y compromiso con su aprendizaje. El patrocinio permite que estos jóvenes tengan acceso a una educación de calidad y oportunidades de empleo en la industria tecnológica."
	},
	{
		id: 4,
		title: "¿Cuál es el costo de patrocinar a un estudiante?",
		description: "El costo puede variar dependiendo de la duración y el alcance del entrenamiento. Sin embargo, Campuslands se encarga de optimizar cada recurso para garantizar la mejor educación posible. Si estás interesado en patrocinar, puedes solicitar información específica para conocer el costo exacto y el plan de pago más adecuado para ti."
	},
	{
		id: 5,
		title: "¿Cuánto tiempo dura el patrocinio?",
		description: "El patrocinio tiene una duración aproximada de 10 a 14 meses. Los primeros 10 meses se dedican al entrenamiento intensivo, donde los jóvenes aprenden desarrollo de software, inglés y habilidades socioemocionales. Luego, pueden pasar a la etapa de 'horas de vuelo', donde aplican sus conocimientos en proyectos reales, haciendo que su perfil sea mucho más competitivo para el mercado laboral."
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

onBeforeMount(() => {
	questionsAndAnswers.value = tabFaqCampersData.value
})

function activeTab(tab) {
	active.value = tab
	questionsAndAnswers.value = tab === 'tabCampers'
	? questionsAndAnswers.value = tabFaqCampersData.value
	: questionsAndAnswers.value = tabFaqSponsersData.value
}
</script>

<style lang="scss" scoped>

</style>