const formFields = [
	{ label: 'Name', name: 'name', placeholder: "Your name?", fieldType: 'text', multiline: false },
	{ label: 'Your Email', name: '_replyto', placeholder: 'Email to contact You?', fieldType: 'email', multiline: false },
	{ label: 'Message', name: 'message', placeholder: 'How can we be of help?', fieldType: 'text', multiline: true, rows:4 }
];
export default formFields;
