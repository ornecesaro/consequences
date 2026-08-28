import type { Ending, Event, ShopItem } from './types'

export const events:Event[]=[
{id:'morning',text:'Llegás a la oficina 7 minutos tarde. Tu jefe te mira desde la puerta: “¿Todo bien?”',choices:[
{id:'coffee',text:'“Necesitaba café. Ahora sí soy una persona.”',effects:{stress:-5,reputation:2,bossTrust:1},nextEvent:'printer'},
{id:'excuse',text:'Inventar una excusa convincente.',effects:{reputation:1,stress:4,bossTrust:-4,information:1},nextEvent:'printer'},
{id:'truth',text:'Admitir que te quedaste dormido.',effects:{reputation:-1,bossTrust:4,stress:-2},nextEvent:'printer'}]},
{id:'printer',text:'La impresora imprime 46 páginas de algo que nadie recuerda haber pedido.',choices:[
{id:'stop',text:'Apagarla antes de que destruya el bosque.',effects:{coworkerTrust:4,reputation:2,information:1},nextEvent:'slack'},
{id:'ignore',text:'Fingir que no la viste.',effects:{coworkerTrust:-3,stress:2},nextEvent:'slack'},
{id:'take',text:'Guardar una copia. “Esto puede servir.”',effects:{information:3,reputation:-1},nextEvent:'slack'}]},
{id:'slack',text:'En el chat general alguien pregunta: “¿Quién rompió producción?” Nadie responde.',choices:[
{id:'confess',text:'“No fui yo, pero puedo ayudar.”',effects:{reputation:4,coworkerTrust:3,stress:4},nextEvent:'lunch'},
{id:'silent',text:'No decir nada.',effects:{stress:-2},nextEvent:'lunch'},
{id:'investigate',text:'Investigar antes de hablar.',effects:{information:2,stress:3},nextEvent:'lunch'}]},
{id:'lunch',text:'Tu compañera ofrece intercambiar su postre por un favor futuro.',choices:[
{id:'deal',text:'Aceptar el trato.',effects:{coworkerTrust:5,stress:-3},nextEvent:'boss'},
{id:'no',text:'Rechazar educadamente.',effects:{coworkerTrust:-1,money:2},nextEvent:'boss'},
{id:'bribe',text:'Ofrecerle dinero en vez del favor.',effects:{money:-5,coworkerTrust:2,information:1},nextEvent:'boss'}]},
{id:'boss',text:'Tu jefe manda: “Necesito hablar con vos. ¿Podés venir a mi oficina?”',choices:[
{id:'now',text:'Ir inmediatamente.',effects:{bossTrust:5,stress:5},nextEvent:'presentation'},
{id:'ask',text:'Preguntar de qué se trata.',effects:{information:2,bossTrust:2},nextEvent:'bossClue'},
{id:'ignore',text:'Dejarlo en visto.',effects:{bossTrust:-8,stress:-3},nextEvent:'bossConflict'}]},
{id:'bossClue',text:'En la oficina del jefe ves una carpeta marcada “AUDITORÍA”. ¿Qué hacés?',choices:[
{id:'read',text:'Leerla discretamente.',effects:{information:3,stress:3,bossTrust:-2},nextEvent:'secret'},
{id:'ask',text:'Preguntar directamente qué pasa.',effects:{information:2,bossTrust:4},nextEvent:'presentation'},
{id:'leave',text:'No tocar nada.',effects:{stress:-2,bossTrust:2},nextEvent:'presentation'}]},
{id:'bossConflict',text:'Cinco minutos después, tu jefe aparece junto a RR. HH. “¿Por qué no contestaste?”',choices:[
{id:'own',text:'Admitir que estabas evitando la conversación.',effects:{bossTrust:-4,reputation:2,stress:5},nextEvent:'presentation'},
{id:'blame',text:'Culpar al chat corporativo.',effects:{bossTrust:-10,reputation:-2,stress:4},nextEvent:'conflict'},
{id:'apologize',text:'Pedir disculpas y escuchar.',effects:{bossTrust:2,reputation:3,stress:-1},nextEvent:'presentation'}]},
{id:'presentation',text:'Hay una presentación titulada “SINERGIA 2.0”. Tu jefe pide una opinión.',choices:[
{id:'honest',text:'“No entiendo nada, pero el gráfico azul está lindo.”',effects:{reputation:3,bossTrust:2,stress:-2},nextEvent:'meeting'},
{id:'corporate',text:'Responder con jerga corporativa durante 40 segundos.',effects:{reputation:5,bossTrust:5,stress:5},nextEvent:'meeting'},
{id:'question',text:'Preguntar cuál es el objetivo real.',conditions:{information:{min:2}},effects:{information:2,bossTrust:4,reputation:3},nextEvent:'meeting'}]},
{id:'secret',text:'Descubrís que la auditoría busca al responsable de un informe que salió mal. Tu nombre aparece en una nota.',condition:{information:{min:3}},choices:[
{id:'save',text:'Guardar evidencia antes de que desaparezca.',effects:{information:2,stress:4},nextEvent:'meeting'},
{id:'confess',text:'Avisarle al jefe que encontraste la nota.',effects:{information:1,bossTrust:6,reputation:2},nextEvent:'meeting'}]},
{id:'conflict',text:'El ambiente se enfría. Un compañero te escribe: “Si necesitás una mano, decime.”',choices:[
{id:'accept',text:'Aceptar la ayuda.',effects:{coworkerTrust:10,stress:-5},nextEvent:'meeting'},
{id:'proud',text:'Decir que podés solo.',effects:{coworkerTrust:-5,reputation:2},nextEvent:'meeting'}]},
{id:'meeting',text:'Alguien propone una idea que claramente fue tuya ayer.',choices:[
{id:'claim',text:'Reclamar crédito.',effects:{reputation:4,coworkerTrust:-5,stress:4},nextEvent:'deadline'},
{id:'share',text:'Compartir el crédito.',effects:{coworkerTrust:6,reputation:2,stress:-2},nextEvent:'deadline'},
{id:'record',text:'Tomar nota de todo.',effects:{information:2,stress:2},nextEvent:'deadline'}]},
{id:'deadline',text:'Son las 17:58. Te piden entregar un informe “rápido”.',choices:[
{id:'stay',text:'Quedarte hasta terminarlo.',effects:{reputation:5,bossTrust:3,stress:12,money:4},nextEvent:'printer2'},
{id:'tomorrow',text:'Negociar entregarlo mañana.',effects:{bossTrust:-1,reputation:2,stress:-5},nextEvent:'printer2'},
{id:'shortcut',text:'Usar la plantilla de la semana pasada.',effects:{information:1,reputation:1,stress:-2},nextEvent:'printer2'}]},
{id:'printer2',text:'La impresora vuelve a encenderse sola. Imprime: “MAÑANA: AUDITORÍA”.',choices:[
{id:'photo',text:'Sacarle una foto.',effects:{information:3,stress:3},nextEvent:'audit'},
{id:'destroy',text:'Romper la hoja.',effects:{stress:-4,information:-1,bossTrust:-2},nextEvent:'audit'},
{id:'leave',text:'Irte a casa.',effects:{stress:-8},nextEvent:'audit'}]},
{id:'audit',text:'A primera hora aparece una auditoría sorpresa.',choices:[
{id:'tell',text:'Contar todo lo que sabés.',conditions:{information:{min:3}},effects:{reputation:7,bossTrust:5,stress:8},nextEvent:'end'},
{id:'small',text:'Contar solo lo imprescindible.',effects:{reputation:3,stress:2},nextEvent:'end'},
{id:'lie',text:'Decir que fue una impresora perfectamente normal.',effects:{reputation:-4,bossTrust:-5,stress:-3},nextEvent:'end'}]},
{id:'end',text:'Terminaste la jornada. Tu destino depende de lo que construiste durante el día.',choices:[{id:'finish',text:'Cerrar la notebook.',effects:{},nextEvent:'ending'}]},
{id:'recovery',text:'Todavía no terminó el día. Tu jefe te ofrece una última oportunidad: arreglar el informe o irte.',choices:[{id:'fix',text:'Arreglarlo aunque duela.',effects:{reputation:8,bossTrust:6,stress:8},nextEvent:'end'},{id:'leave',text:'Irte. Ya fue suficiente.',effects:{stress:-10},nextEvent:'end'}]}
]

export const endings:Ending[]=[
{id:'promotion',title:'Ascenso accidental',text:'Tu caos fue interpretado como liderazgo. Te ascienden. Nadie sabe por qué.',minScore:70},
{id:'survivor',title:'Empleado del mes',text:'No brillaste, pero sobreviviste sin incendiar la oficina. En esta empresa eso cuenta.',minScore:35,maxScore:69},
{id:'hr',title:'Una charla con Recursos Humanos',text:'Tu calendario acaba de recibir una reunión titulada “Hablemos”. No parece una invitación.',minScore:0,maxScore:34},
{id:'collapse',title:'Renuncia espiritual',text:'Tenés tanta información y tan poca confianza del jefe que entendés que ya no existe un futuro normal acá.',minScore:-999,maxScore:-1}
]
export const shopItems:ShopItem[]=[
{id:'coffee',name:'Café de emergencia',description:'Arrancás la próxima run con -10 Stress.',priceCoins:35,type:'boost',effect:'stress-10'},
{id:'reroll',name:'Segunda opinión',description:'Después de una decisión, podés volver atrás y elegir otra.',priceCoins:55,type:'reroll',effect:'reroll-1'},
{id:'continue',name:'Modo “cinco minutos más”',description:'Si una run termina mal, podés continuar desde el punto de quiebre.',priceCoins:80,type:'continue',effect:'continue-1'},
{id:'snacks',name:'Galletitas de la sala',description:'Arrancás con +5 Coworker Trust.',priceCoins:45,type:'boost',effect:'coworkerTrust+5'}
]
