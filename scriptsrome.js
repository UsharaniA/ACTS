document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.map-container');
    const pinsData = [
        { 
            x: 821, 
            y: 30, 
            comment: `
            • Herod the Great-Massacre of male infants Mat 2:16-18, expansion of the Second Temple in Jerusalem, which is often referred to as Herod's Temple.
            • Herod Antipas- one of the sons of Herod grest ,beheded john the Baptist , had a role to trail jesus but sent to Pontius pilate.
            • Herod Agripaa 1:Herod Agrippa I was the grandson of Herod the Great and the nephew of Herod Antipas. execution of James the Just, the brother of John, struck down by an angel of the Lord  Acts 12:21–23.
            • King Agripa- - Son of Herod Agrippa 1, had 3 sisters , one was Bernice(wife to a raman emperor titus), younger was Drusilla.
            `, 
            number: 'N' 
        },
        { 
            x: 829, 
            y: 380, 
            comment: `
            • Arrest in Jerusalem: Paul is brought before the Sanhedrin (the Jewish council) by Claudius Lysias. Paul divides the council by declaring his Pharisee background and his belief in the resurrection, causing a dispute between the Pharisees and Sadducees.
            • Transfer to Caesarea: Governor Felix, who had a third wife Drusilla, the youngest daughter of Herod Agrippa and sister to King Agrippa and Bernice. Jewish accuser brings lawyer named Tertullus.
            • Paul was accused of being a troublemaker (“this man…stirs up riots among all the Jews throughout the world” Acts 24:5).
            • Paul was accused of being the ringleader in a fringe religious group (“this man…is a ringleader of the sect of the Nazarenes” Acts 24:5).
            • Paul was accused of being a desecrater of the temple (“this man…even tried to profane the temple”).
            • Governor Festus
            • King Agrippa 1
            `, 
            number: 1 
        },
        { 
            x: 786, 
            y: 387, 
            comment: `
           • Paul taken to Rome from Caesarea, Luke joins him, taken by a Centurion – Julius
            • Luke and Aristarchus accompanied Paul on the ship. Aristarchus had come with Paul several years back from his home church in Thessalonica to help bring the Greek churches’ contributions to the church in Jerusalem.
            • Centurion carried with him the papers that were prepared for Paul’s appeal, including the most recent write-up where Agrippa and Festus had found no crime associated with Paul.
            `, 
            number: 2 
        },
        { 
            x: 607, 
            y: 265, 
            comment: `
            • The Alexandrian ships were those that carried grain to RomeThe ships were typically quite large and this one, Luke tells us, had 276 people onboard for the voyage.
            `, 
            number: 3 
        },
        { 
            x: 436, 
            y: 312, 
            comment: `
            • “Sirs, I perceive that the voyage will be with injury and much loss, not only of the cargo and the ship, but also of our lives” (Acts 27:10).
            `, 
            number: 4 
        },
        { 
            x: 108, 
            y: 247, 
            comment: `
            • A viper came out of the sticks and bit onto Paul’s hand.
            • The chief of the island, Publius, received Paul, Luke, and others, and entertained them for three days.
            • Publius’s father was sick with fever and dysentery. Paul prayed over him, laid hands on him, and healed him!
            • News of the healing spread quickly, and soon all the sick on the island were coming to Paul for healing.
            • Paul and his companions spent three winter months on the island of Malta. 
            • Once winter was over, they boarded a ship that had wintered in the harbor to sail on to Italy.
            • The ship was a grain ship from Alexandria much like the one shipwrecked upon the reefs.
            `,             
            number:  5
        },

        { 
            x: 64, 
            y: 30, 
            comment: `
            • Once Paul arrived in Rome, he was allowed to stay by himself in a rented room under the care of the soldier charged with guarding him.
            • Paul stayed in Rome for two years at his own expense.
            • Letters written-Ephesians, Philippians, Colossians, Philemon
            `,             
            number:  6
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