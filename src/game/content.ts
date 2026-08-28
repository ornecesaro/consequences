import type { Ending, Event, ShopItem } from './types'

export const events: Event[] = [
{id:'morning',text:'Llegás a la oficina 7 minutos tarde. Tu jefe te mira desde la puerta. “¿Todo bien?”',choices:[
{id:'coffee',text:'“Necesitaba café. Ahora sí soy una persona.”',effects:{stress:-5,reputation:2,bossTrust:1},nextEvent:'printer'},
{id:'excuse',text:'Inventar una excusa convincente.',effects:{reputation:1,stress:4,bossTrust:-4,information:1},nextEvent:'printer'},
{id:'truth',text:'Admitir que te quedaste dormido.',effects:{reputation:-1,bossTrust:4,stress:-2},nextEvent:'printer'}]},
{id:'printer',text:'La impresora está imprimiendo 46 páginas de algo que nadie recuerda haber pedido.',choices:[
{id:'stop',text:'Apagarla antes de que destruya el bosque.',effects:{coworkerTrust:4,reputation:2,information:1},nextEvent:'slack'},
{id:'ignore',text:'Fingir que no la viste.',effects:{coworkerTrust:-3,stress:2},nextEvent:'slack'},
{id:'take',text:'Guardar una copia. “Esto puede servir.”',effects:{information:3,reputation:-1},nextEvent:'slack'}]},
{id:'slack',text:'En el chat general alguien pregunta: “¿Quién rompió producción?” Nadie responde.',choices:[
{id:'confess',text:'Responder: “No fui yo, pero puedo ayudar.”',effects:{reputation:4,coworkerTrust:3,stress:4},nextEvent:'lunch'},
{id:'silent',text:'No decir nada.',effects:{stress:-2},nextEvent:'lunch'},
{id:'investigate',text:'Investigar antes de hablar.',effects:{information:2,stress:3},nextEvent:'lunch'}]},
{id:'lunch',text:'Almuerzo. Tu compañera te ofrece intercambiar su postre por un favor futuro.',choices:[
{id:'deal',text:'Aceptar el trato.',effects:{coworkerTrust:5,stress:-3},nextEvent:'boss'},
{id:'no',text:'Rechazar educadamente.',effects:{coworkerTrust:-1,money:2},nextEvent:'boss'},
{id:'bribe',text:'Ofrecerle dinero en vez del favor.',effects:{money:-5,coworkerTrust:2,information:1},nextEvent:'boss'}]},
{id:'boss',text:'Tu jefe manda: “Necesito hablar con vos. ¿Podés venir a mi oficina?”',choices:[
{id:'now',text:'Ir inmediatamente.',effects:{bossTrust:5,stress:5},nextEvent:'presentation'},
{id:'ask',text:'Preguntar de qué se trata.',effects:{information:2,bossTrust:2},nextEvent:'presentation'},
{id:'ignore',text:'Dejarlo en visto.',effects:{bossTrust:-8,stress:-3},nextEvent:'presentation'}]},
{id:'presentation',text:'En la oficina hay una presentación titulada “SINERGIA 2.0”. Tu jefe te pide una opinión.',choices:[
{id:'honest',text:'“No entiendo nada, pero el gráfico azul está lindo.”',effects:{reputation:3,bossTrust:2,stress:-2},nextEvent:'meeting'},
{id:'corporate',text:'Responder con jerga corporativa durante 40 segundos.',effects:{reputation:5,bossTrust:5,stress:5},nextEvent:'meeting'},
{id:'question',text:'Preguntar cuál es el objetivo real.',conditions:{information:{min:2}},effects:{information:2,bossTrust:4,reputation:3},nextEvent:'meeting'}]},
{id:'meeting',text:'Reunión inesperada. Alguien propone una idea que claramente fue tuya ayer.',choices:[
{id:'claim',text:'Reclamar crédito.',effects:{reputation:4,coworkerTrust:-5,stress:4},nextEvent:'deadline'},
{id:'share',text:'Compartir el crédito.',effects:{coworkerTrust:6,reputation:2,stress:-2},nextEvent:'deadline'},
{id:'record',text:'Tomar nota de todo.',effects:{information:2,stress:2},nextEvent:'deadline'}]},
{id:'deadline',text:'Son las 17:58. Te piden entregar un informe “rápido”.',choices:[
{id:'stay',text:'Quedarte hasta terminarlo.',effects:{reputation:5,bossTrust:3,stress:12,money:4},nextEvent:'printer2'},
{id:'tomorrow',text:'Negociar entregarlo mañana.',effects:{bossTrust:-1,reputation:2,stress:-5},nextEvent:'printer2'},
{id:'shortcut',text:'Usar la plantilla de la semana pasada.',effects:{information:1,reputation:1,stress:-2},nextEvent:'printer2'}]},
{id:'printer2',text:'Antes de irte, la impresora vuelve a encenderse sola. Imprime una hoja: “MAÑANA: AUDITORÍA”.',choices:[
{id:'photo',text:'Sacarle una foto.',effects:{information:3,stress:3},nextEvent:'audit'},
{id:'destroy',text:'Romper la hoja.',effects:{stress:-4,information:-1,bossTrust:-2},nextEvent:'audit'},
{id:'leave',text:'Irte a casa.',effects:{stress:-8},nextEvent:'audit'}]},
{id:'audit',text:'A primera hora, aparece una auditoría sorpresa. Te preguntan si viste algo extraño.',choices:[
{id:'tell',text:'Contar todo lo que sabés.',conditions:{information:{min:3}},effects:{reputation:7,bossTrust:5,stress:8},nextEvent:'end'},
{id:'small',text:'Contar solo lo imprescindible.',effects:{reputation:3,stress:2},nextEvent:'end'},
{id:'lie',text:'Decir que fue una impresora perfectamente normal.',effects:{reputation:-4,bossTrust:-5,stress:-3},nextEvent:'end'}]},
{id:'end',text:'Terminaste la jornada. Tu destino depende de lo que construiste durante el día.',choices:[{id:'finish',text:'Cerrar la notebook.',effects:{},nextEvent:'ending'}]}
]

export const endings: Ending[] = [
{id:'promotion',title:'Ascenso accidental',text:'Tu día fue un desastre, pero alguien interpretó tu caos como liderazgo. Te ascienden. Nadie sabe por qué.',minScore:70},
{id:'survivor',title:'Empleado del mes (por descarte)',text:'No brillaste, pero sobreviviste sin incendiar la oficina. En esta empresa eso cuenta.',minScore:35,maxScore:69},
{id:'hr',title:'Una charla con Recursos Humanos',text:'Hay una reunión en tu calendario titulada “Hablemos”. No parece una invitación.',minScore:0,maxScore:34},
{id:'collapse',title:'Renuncia espiritual',text:'Te vas de la oficina mirando al horizonte. Técnicamente seguís empleado, pero tu alma no.',minScore:-999,maxScore:-1}
]

export const shopItems: ShopItem[] = [
{id:'coffee',name:'Café de emergencia',description:'Arrancás la próxima run con -10 Stress.',priceCoins:35,type:'boost',effect:'stress-10'},
{id:'reroll',name:'Segunda opinión',description:'Permite repetir una decisión durante una run.',priceCoins:55,type:'reroll',effect:'reroll-1'},
{id:'continue',name:'Modo “cinco minutos más”',description:'Permite continuar después de un final malo.',priceCoins:80,type:'continue',effect:'continue-1'},
{id:'snacks',name:'Galletitas de la sala',description:'Arrancás con +5 Coworker Trust.',priceCoins:45,type:'boost',effect:'coworkerTrust+5'}
]
