document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.map-container');
    const pinsData = [
        { 
            x: 281, 
            y: 188, 
            comment: `
            • Paul came to Ephesus.
            • After three months of teaching, some were stubbornly refusing to put their faith, as Ephesus is home to temples.
            • Paul preached for two solid years.
            • Ephesus is a center for magical incantation.
            • Acts 19:10 - All the residents of Asia heard the word of the Lord, both Jews and Greeks.
            • Acts 19:15 - Some Jews casting out evil spirits in the name of Jesus were scourged by an evil spirit, which led the sorcerers to burn their scrolls.
            • Acts 19:24 - Demetrius made shrines to Artemis. The temple, built from a stone that fell from the sky (Acts 19:35), was a huge economic driver for Ephesus.
            • Acts 19:25 - Demetrius stirred up a commotion.
            • Acts 19:28 - The whole city was in an uproar and was silenced by the clerk.
            `, 
            number: 1 
        },
        { 
            x: 154, 
            y: 22, 
            comment: `
            • Acts 20:5 : Luke joins Paul in Philiphi to go back to Jerusalem 
            `, 
            number: 2 
        },
        { 
            x: 257, 
            y: 90, 
            comment: `
            • Eutychus  fell down from 3 storey building , Paul went down to the street and cradled Eutychus in his arms.   God restored life

            `, 
            number: 3 
        },
        { 
            x: 292, 
            y: 236, 
            comment: `
                • Paul went to Miletus and summoned the elders of the church at Ephesus.
                • He spoke about his hardships and how God led him in every city.
                • Paul anticipated his imprisonment.
                • Acts 20:30 - Paul encouraged the elders to be on guard against antichrists.
                • The elders wept for him (Acts 20:37).

            `, 
            number:  4
        },
        // Add more pin data as needed
    ];
    
    pinsData.forEach(pinData => {
        const pin = document.createElement('div');
        pin.classList.add('pin');
        pin.setAttribute('data-comment', pinData.comment);
        imageContainer.appendChild(pin);

        setPinPosition(pin, pinData.x, pinData.y,pinData.number);

        pin.addEventListener('mouseenter', (event) => {
            showTooltip(event.target);
        });

        pin.addEventListener('mouseleave', () => {
            hideTooltip();
        });
    });
});

function setPinPosition(pin, pixelX, pixelY,number) {
    const img = document.getElementById('interactive-image');
    const rect = img.getBoundingClientRect();

   // Convert pixel coordinates to percentage based on image size
   const imgWidth = rect.width;
   const imgHeight = rect.height;
    console.log(`The natural width of the image is: ${imgWidth}px`);

    const percentX = (pixelX / imgWidth) * 100;
    const percentY = (pixelY / imgHeight) * 100;
    
    console.log(`Pin position: ${percentX}% left, ${percentY}% top`);

    pin.style.left = percentX + '%';
    pin.style.top = percentY + '%';
     // Set the number inside the pin
     pin.textContent = number;
    document.querySelector('.map-container').appendChild(pin);
}

function showTooltip(pin) {
    const tooltip = document.getElementById('tooltip');

    // Get the comment from the pin's data attribute
    const comment = pin.getAttribute('data-comment');
    // tooltip.textContent = comment;

    // Convert formatted comment to HTML list
    const formattedComments = comment
    .trim()
    .replace(/\n\s*•/g, '<li>') // Convert bullet points to list items
    .replace(/\n/g, '<br>') // Preserve line breaks
    .replace(/<\/li><br>/g, '</li><br>'); // Ensure proper list item closing

tooltip.innerHTML = `<ul>${formattedComments}</ul>`; // Wrap comments in an unordered list


    // Get the position and size of the pin element
    const rect = pin.getBoundingClientRect();

    // Get the tooltip's dimensions
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    // Calculate the position of the tooltip
    const tooltipX = rect.left + window.scrollX + (pin.offsetWidth / 2) - (tooltipWidth / 2);
    const tooltipY = rect.top + window.scrollY - tooltipHeight - 10; // 10px offset from the pin

    // Apply the calculated position and make the tooltip visible
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}