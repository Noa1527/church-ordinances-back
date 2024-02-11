type PriesthoodLessonMailData = {
    lastname: string;
    firstname: string;
    date: string;
    lesson: string;
    PDC: string;
};
  
export default function (data: PriesthoodLessonMailData) {
    return {
        text: `
            Bonjour ${data.lastname} ${data.firstname},\n\n
            serait il possible que tu fasse la leçon pour la pretrise le dimanch ${data.date}\n
            ne pas oublier de nous prevenire si tu ne pout pas faire la leçons.\n\n
            La leçon cest ${data.lesson}\n\n
            Cordialement,\n
            Le Président de collège.\n
            Important:\n
            Ne pas répondre à l'expéditeur de cet e-mail. Si vous souhaitez me contacter, utilisez mon adresse mail perso ${data.PDC}.
        `,
        html: `
            Bonjour ${data.lastname} ${data.firstname},<br><br>
            Serait-il possible que tu fasse la leçon pour la pretrise le dimanch ${data.date},<br>
            ne pas oublier de nous prevenire si tu ne peut pas faire la leçon<br><br>
            La leçon sera: ${data.lesson}<br><br>
            Cordialement,<br>
            Le Président de collège.<br>
            Important:<br>
            Ne pas répondre à l'expéditeur de cet e-mail. Si vous souhaitez me contacter, utilisez mon adresse mail perso ${data.PDC}.
        `,
    };
}