type MinisteringAppointmentMailData = {
    date: string;
    heur: string;
    url: string;
    PDC: string;
};
  
export default function (data: MinisteringAppointmentMailData) {
    return {
        text: `
            Bonjour mes frères,\n\n
            Je vous invite à un entretien de service pastoral.\n\n
            La date et l'heur de l'entretien\n
            sera le ${data.date} a ${data.heur} par zoom,\n\n
            le lien est le suivant :\n
            ${data.url}\n\n
            ne pas oublier de vous connecter a l'heure !\n\n
            Cordialement,\n
            Le Président de collège.\n\n
            Important:\n
            Ne pas répondre à l'expéditeur de cet e-mail. Si vous souhaitez me contacter, utilisez mon adresse mail perso ${data.PDC}.
        `,
        html: `
            Bonjour mes frères,<br><br>
            Je vous invite à un entretien de service pastoral.<br><br>
            La date et l'heur de l'entretien<br>
            sera le ${data.date} a ${data.heur} par zoom,<br><br>
            le lien est le suivant :<br>
            ${data.url}<br><br>
            ne pas oublier de vous connecter a l'heure<br><br>
            Cordialement,<br>
            Le Président de collège.<br><br>
            Important:<br>
            Ne pas répondre à l'expéditeur de cet e-mail. Si vous souhaitez me contacter, utilisez mon adresse mail perso ${data.PDC}.
        `,
    };
}
  