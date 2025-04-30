import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class PdfService {
    generatePdf(data: any, res: Response) {
        console.log('data', data);
        
        const doc = new PDFDocument({ size: 'A4' });

        const date = new Date(data.dateOfTheDay);
        const dateNextReu = new Date(data.formattedNextDate);
        const formattedDate = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
        }).replace(/ /g, '_');

        const formatted_date = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        })

        const formattedNextDate = dateNextReu.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        })

        const startParts = data.start.replace('AM', '').replace('PM', '').trim().split(':');
        const endParts = data.end.replace('AM', '').replace('PM', '').trim().split(':');

        let startHour = parseInt(startParts[0]);
        if (data.start.includes('PM') && startHour !== 12) {
        startHour += 12;
        } else if (data.start.includes('AM') && startHour === 12) {
        startHour = 0;
        }

        let endHour = parseInt(endParts[0]);
        if (data.end.includes('PM') && endHour !== 12) {
        endHour += 12;
        } else if (data.end.includes('AM') && endHour === 12) {
        endHour = 0;
        }

        const formattedStart = `${startHour.toString().padStart(2, '0')}H${startParts[1]}`;
        const formattedEnd = `${endHour.toString().padStart(2, '0')}H${endParts[1]}`;

        console.log(`Début : ${formattedStart}`);
        console.log(`Fin : ${formattedEnd}`);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=ODJ_Collége_${formattedDate}.pdf`);

        doc.pipe(res);

        // Dimensions et marges
        const pageWidth = 595.28;
        const margin = 30;
        const boxPadding = 10;
        const boxHeight = 70;
        const boxWidthLeft = pageWidth / 6;  // Taille de la première case
        const boxWidthRight = pageWidth - boxWidthLeft - 2 * margin;  // Taille de la deuxième case

        // Couleurs et polices
        const headerColor = '#8B0000'; // couleur rouge foncé pour le titre

        // 1er margin : cest la marge de gauche
        // 2nd margin : cest la marge de haut
        // 3eme cest la width de la case
        // 4eme cest la hauteur

        // 1er ligne : titre
        // Première case : "Branche de TOUL"
        doc.rect(margin, margin, boxWidthLeft, boxHeight).stroke();  // Dessine la bordure
        doc.fontSize(16).fillColor(headerColor).text('Branche de', margin + 10, margin + 10);
        doc.fontSize(16).text('TOUL', margin + 25, margin + 30);

        // Deuxième case : "Réunion de Collège des Anciens"
        doc.rect(margin + boxWidthLeft, margin, boxWidthRight, boxHeight).stroke();  // Dessine la bordure
        doc.fontSize(16).fillColor('black').text('RÉUNION DE COLLÈGE DES ANCIENS', margin + boxWidthLeft + 10, margin + 10, { align: 'center' });
        doc.fontSize(12).text(`${formatted_date}`, margin + boxWidthLeft + 10, margin + 35, { align: 'center' });
        doc.text(`De ${formattedStart} à ${formattedEnd}`, margin + boxWidthLeft + 10, margin + 50, { align: 'center' });

        // 2 eme ligne : presidée et dirigée
        doc.rect(margin, margin + boxHeight, boxWidthLeft, boxHeight - 40).stroke();
        doc.fontSize(12).text(`Présidée par:`, margin + 5, margin + boxWidthLeft - 20);

        doc.rect(margin * 2 + boxHeight - 0.5, margin + boxHeight, boxWidthLeft, boxHeight - 40).stroke();
        doc.fontSize(12).text(`${data.preside.name}`, margin * 2 + boxHeight - 0.5 + 5 , margin + boxWidthLeft - 20);
        doc.rect(margin * 3 + boxHeight * 2 - 1, margin + boxHeight, boxWidthLeft, boxHeight - 40).stroke();
        doc.fontSize(12).text(`Dirigée par:`, margin * 3 + boxHeight * 2 - 1 + 5 , margin + boxWidthLeft - 20);
        
        doc.rect(margin * 4 + boxHeight * 3 - 1.5, margin + boxHeight, boxWidthLeft * 2.385, boxHeight - 40).stroke();
        doc.fontSize(12).text(`${data.dirige.name}`, margin * 4 + boxHeight * 3 - 1.5 + 5 , margin + boxWidthLeft - 20);

        // 3eme ligne : manuel general
        doc.rect(margin, margin + 70, pageWidth - 2 * margin, 80).stroke();
        doc.fontSize(12).text(`Manuel Général: ${data.manuelGeneral ? data.manuelGeneral : 'Non renseigné'}`, margin + 5, margin + 120, { underline: true });

        // 4eme ligne : qui fait quoi exemple : priere
        doc.rect(margin, margin + 150, boxWidthLeft * 2 , 120).stroke();
        doc.fontSize(12).text(`Prière d’ouverture:` , margin + 5, margin + 170);
        doc.fontSize(12).text(`Pensée spirituelle:` , margin + 5, margin + 200);
        doc.fontSize(12).text(`Lecture du Compte Rendu:` , margin + 5, margin + 230);
        
        doc.rect(margin + boxWidthLeft * 2, margin + 150, boxWidthRight - boxWidthLeft, 120).stroke();
        doc.fontSize(12).text(`${data.memberOpenPrayer.name ? data.memberOpenPrayer.name : 'Non renseigné'}` , margin + boxWidthLeft * 2 + 5, margin + 170);
        doc.fontSize(12).text(`${data.memberSpiritualThoughts.name ? data.memberSpiritualThoughts.name : 'Non renseigné'} -> ${data.subjectSpiritualThoughts ? data.subjectSpiritualThoughts : 'Non renseigné'}` , margin + boxWidthLeft * 2 + 5, margin + 200);
        doc.fontSize(12).text(`${data.report.name ? data.report.name : 'Non renseigné'}` , margin + boxWidthLeft * 2 + 5, margin + 230);

        // 5eme ligne : ordre du jour titre
        doc.rect(margin, margin + 270, pageWidth - 2 * margin , 40).stroke();
        doc.fontSize(17).fillColor(headerColor).text("Sujets à l'ordre du jour", margin + boxPadding + 30, margin + 290, { underline: true, align: 'center' });

        const agendaHeight = data.agenda.length * 60; // hauteur totale des items de l'agenda
        const ordreDuJourY = margin + 250 + agendaHeight + 0; // position verticale de "Ordre du jour"

        // 6eme ligne : ordre du jour
        doc.rect(margin, margin + 310, pageWidth - 2 * margin, 410).stroke();
        data.agenda.forEach((item, index) => {
        doc.fontSize(10).fillColor('black').text(`${index + 1}. ${item.point}`, margin + boxPadding, margin + 330 + index * 25);
        });

        doc.fontSize(14).fillColor(headerColor).text("Compte Rendu", margin + boxPadding, ordreDuJourY, { underline: true, align: 'start' });
        data.conteRendu.forEach((item, index) => {
        doc.fontSize(10).fillColor('black').text(`${index + 1}. ${item.point}`,  margin + boxPadding, margin + 500 + index * 40);
        });

        // Section Finalisation
        const footerStart = margin + 720;
        doc.rect(margin, footerStart, boxWidthLeft, 20).stroke();
        doc.fontSize(12).fillColor('black').text("Prière de clôture:", margin + 5, 730 + 25 );

        doc.rect(margin * 2 + boxHeight - 0.5, footerStart, boxWidthLeft, 20).stroke();
        doc.fontSize(12).fillColor('black').text(`${data.memberClosePrayer?.name ? data.memberClosePrayer?.name : "Non renseigné"}`, margin + 100 + 5 , 730 + 25 );

        doc.rect(margin * 3 + boxHeight * 2 - 1, footerStart, boxWidthLeft, 20).stroke();
        doc.fontSize(11).fillColor('black').text("Prochaine réunion:", margin + 200 + 5 , 730 + 25 );

        doc.rect(margin * 4 + boxHeight * 3 - 1.5, footerStart, boxWidthLeft * 2.385, 20).stroke();
        doc.fontSize(12).fillColor('black').text(`${formattedNextDate ? formattedNextDate : "Non renseigné"}`, margin + 300 + 5, 730 + 25 );

        doc.end();
    }
}