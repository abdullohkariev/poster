export interface Scenario { title:string; situation:string; options:{text:string; feedback:string}[]; connection:string }
export const scenarios:Scenario[] = [
 {title:'Someone gets blamed.',situation:'A student is blamed for something they did not do. Other classmates start agreeing without hearing their side.',options:[
 {text:'Listen to the student before judging.',feedback:'Listening makes room for a story others may have missed. You do not have to decide what happened on your own.'},
 {text:'Ask a trusted teacher to help.',feedback:'Asking for support is a thoughtful action. A trusted adult can help everyone be heard safely.'},
 {text:'Stay quiet because you feel nervous.',feedback:'Feeling nervous is understandable. You could check in privately later or ask a trusted adult for help. Your safety matters too.'}],connection:'A connection to guilt: being blamed does not mean someone is responsible. Consider the circumstances before judging.'},
 {title:"Someone isn’t being heard.",situation:'A classmate has an idea, but others keep interrupting.',options:[
 {text:'Invite them to finish speaking.',feedback:'A small invitation can make space for someone else. Let them decide whether they want to continue.'},
 {text:'Ask the group to listen fairly.',feedback:'You can help the group notice a habit that shuts someone out. A calm reminder can change the conversation.'},
 {text:'Speak to them privately afterward.',feedback:'Support can be quiet too. Ask what they would find helpful instead of speaking for them.'}],connection:'A connection to voice: supporting someone means making room for their words and respecting their choices.'},
 {title:'Is a rule always fair?',situation:'A school activity leaves some students out for a reason that does not seem fair.',options:[
 {text:'Ask why the rule exists.',feedback:'A respectful question can help you understand the reason for a rule and notice whose needs it overlooks.'},
 {text:'Suggest a more inclusive solution.',feedback:'Offering an alternative can turn concern into a practical change. Listen to the students affected.'},
 {text:'Speak with a trusted teacher or organizer.',feedback:'You do not have to change the rule alone. Someone with responsibility can help consider a fairer approach.'}],connection:'A connection to education: opportunities are shaped by rules and expectations. Fairness includes asking who can take part.'}
];
