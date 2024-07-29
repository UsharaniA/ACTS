document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.map-container');
    const pinsData = [
        { 
            x: 763, 
            y: 279, 
            comment: `
                • Manean-a member of the court, This title “was given to boys of the same ages as princes, who were brought up with them at court.
                • Herod Antipas and Manean are brought up together as playmates at the royal court.
                • The church hears and understands the Spirit’s call and following a special fast and prayer, lay hands on Barnabas and Saul and “sent them off” (Acts 13:3).
            `, 
            number:1
        },
        { 
            x: 631, 
            y: 345, 
            comment: `
                • Barnabas was from Cyprus, John Mark was a cousin of Barnabas’s.
                • On Cyprus, the three sailed into the port of Salamis and wasted no time presenting the Word of God in the synagogues.
            `, 
            number: 2 
        },
        { 
            x: 523, 
            y: 269, 
            comment: `
            • In Perga, Paul and Barnabas decide to head inland up into the mountain regions going first to Pisidian Antioch.
            `, 
            number: 3 
        },
        { 
            x: 467, 
            y: 172, 
            comment: `
                •  Paul explains that salvation comes from Jesus, the synagogue began to fill up, Jews became greedy.
            `, 
            number:  4
        },
        { 
            x: 546, 
            y: 188, 
            comment: `
                • In Iconium, an attempt was made to mistreat and stone them, so they left to Lystra and healed a crippled man.
            `, 
            number:  5
        },
        { 
            x: 552, 
            y: 221, 
            comment: `
                • The people thought they were Zeus and Hermes, brought oxen and garlands to sacrifice.
                • Paul and Barnabas were horrified. They tore their garments and showed themselves fully human, crying.
            `, 
            number:  6
        },

        { 
            x: 637, 
            y: 229, 
            comment: `
                •After Derbe, Paul had several options for the return home. One was the overland route that would have taken Paul back through his hometown of Tarsus.
                • Instead, Paul and Barnabas opted to return back to the places they went before.
            `, 
            number:  7
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