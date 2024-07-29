document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.map-container');
    const pinsData = [
        { 
            x: 781, 
            y: 268, 
            comment: `
                • The infant churches began in synagogues with Jews and Gentiles coming to faith.<br>
                • Paul wanted to go back to the churches.<br>
                • Acts 15:22 - Some converted Jews created chaos between the Gentile believers by insisting on circumcision (Antioch, Syria, Cilicia).<br>
                • James, the Lord’s brother, and other leaders sent Silas and Judas to the Gentile church to disregard the circumcision requirement.<br>
            `, 
            number: 1 
        },
        {
            x: 552, 
            y: 224, 
            comment: `
                • Paul met Timothy (grandmother Jewish, father Greek) in Lystra.<br>
                • Paul circumcised Timothy (Acts 16:3).<br>
            `,
            number: 2
        },
        {
            x: 155, 
            y: 17, 
            comment: `
                • Acts 16:19 - Paul and Silas were dragged to the street by the slave girl’s owner who profited from her spirit of divination.<br>
                • The men were stripped, beaten, and shackled in a torture device.<br>
                • Paul and Silas reacted by singing hymns and praying to God.<br>
                • The next morning, Luke must have heard an incredible story.<br>
                • Paul revealed that he and Silas were Roman citizens, which mortified the authorities.<br>
                • Luke remained in Philippi.<br>
            `,
            number: 3
        },
        {
            x: 14, 
            y: 81,
            comment: `
                • Acts 17:2 - Paul was not driven by emotions but persuaded people with reasoning, going to the synagogue for three weeks.
                • Jason was attacked in Thessalonica, and Paul & Silas left.
                • Paul went to Berea, where the Jews were more noble than in Thessalonica.
                • Acts 17:11 - The Bereans received the gospel eagerly and examined the Scriptures.
                • Thessalonica Jews came to Berea and stirred up the crowd against Paul.
                • Silas and Timothy stayed in Berea.
                • Paul went to Athens, a city known for culture and education, and encountered Epicurean and Stoic philosophers.
                • Acts 17:21 - Paul was brought before the Areopagus council.
                • Paul noted the Greeks' devotion and spoke about the "unknown god" (Acts 17:22-23).
                • Paul made a logical statement that more philosophers came to realize made sense.
            `,
            number: 4
        },
        {
            x: 59, 
            y: 196,
            comment: `
                • **Acts 18:1**: Paul goes to Corinth. When Caesar rebuilt Corinth, he populated it with Roman colonists. Paul would have come into the picture roughly 100 years later. By that time, Corinth was already a prosperous and wealthy city.<br>
                • Corinth held a unique place for trade and travel.<br>
                • Paul found a Jew named Aquila and his wife Priscilla. Like Paul, they were tentmakers. Paul worked with them using his tent-making skills to make ends meet while teaching in the synagogues.<br>
                • Crispus, the ruler of the synagogue, put his faith in Christ along with his family. They were among many in Corinth who heard Paul, believed, and were baptized (Acts 18:8-9).<br>
                 `,
            number: 5
        },
        {
            x: 281, 
            y: 188,
            comment: `
                • **Acts 18:19**: Priscilla and Aquila sailed with Paul as far as Ephesus, and they chose to stay there rather than go on with Paul.<br>
                • Apollos was teaching in the synagogue at Ephesus during Pauls absence, as he best understood, when Priscilla and Aquila heard him and explained the way of God.<br>

            `,
            number: 6
        },
        {
            x: 681, 
            y: 490,
            comment: `
                • **Acts 18:22**: Paul landed at Caesarea, near Jerusalem.<br>
                • Paul travelled through Galatia, Phyrgia, strengthening churches.<br>

            `,
            number: 7
        }
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
    // const imageContainer = document.querySelector('.map-container');

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
    // imageContainer.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}