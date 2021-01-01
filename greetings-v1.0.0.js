/**
 * Name: Greetings
 * Description: Generate greetings JavaScript and jQuery plugin
 * Author: Shrikumar Infotech
 * Author URI: dev@shrikumarinfotech.com
 * License: GPLv2.0 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

'use strict';

$(document).ready(function(){
    // Define form data object
    let formDataObject = {
        type: String,
        sendername: String,
        recipientname: String,
        message: String
    };

    // Define Greetings form function
    function greetingsForm(){
        // Define the form
        const form = $('#greetings-form');
        // console.log(form);

        // -------------------------------------------------------
        // Define RegX for replace encoded chareters
        const regxSpace = /(?:%20)/gi;
        const regxType = /(?:type=)/gi;
        const regxSenderName = /(?:sendername=)/gi;
        const regxRecipientName = /(?:recipientname=)/gi;
        const regxMessage = /(?:message=)/gi;
        const regxSpaceLineBreak = /(?:%0D%0A)/gi;
        const regxAnd = /(?:&)/gi;
        // -------------------------------------------------------

        // -------------------------------------------------------
        // Define submit function
        form.on('submit', function(e){
            e.preventDefault();

            // Save data with formatting
            const formData = $(form).serialize().replace(regxSpace, ' ').replace(regxType, '').replace(regxSenderName, '').replace(regxRecipientName, '').replace(regxMessage, '').replace(regxSpaceLineBreak, '').split('&');

            // Test log
            // console.log(formData);

            // convert data into object
            createObject(formData);

            // Test log
            // console.log(formDataObject);

            // Display Greetings
            greetings(formDataObject).displayGreeting();

        });
        // -------------------------------------------------------

    }
    greetingsForm();

    // Define Greetings funtion
    function greetings(dataObject){
        // -------------------------------------------------------
        // Define display elements from HTML
        // Greeting Form
        const greetingForm = $('#greetings-generator');
        // Greetings Wrapper
        const greetingsWrapper = $('#greetings-wrapper');
        // Header Elements
        const headerTitle = $('.greeting-header h2');
        const headerMessage = $('.greeting-header p');
        // Body Elements
        const greetingImage = $('.greeting-body img');
        const greetingAudio = $('.greeting-body audio');
        // Footer Elements
        const footerSenderName = $('.sendername');
        const footerCredits = $('.greeting-footer > .credits');
        // -------------------------------------------------------

        // -------------------------------------------------------
        // Define input values
        const theGreetingType = dataObject.type;
        const theSenderName = dataObject.sendername;
        const theRecepientName = dataObject.recipientname;
        const theGreetingMessage = dataObject.message;
        // -------------------------------------------------------

        // -------------------------------------------------------
        // Define greetings type
        const greetingType = {
            christmas: ['christmas', 'xmas', 'merry-christmas', 'merry-xmas', 'new year', 'happy new year', 'new-year', 'happy-new-year', 'new-year-eve', 'new year eve'],
            newyear: ['happy new year', 'new year', 'new year eve', 'new-year', 'happy-new-year']
        };
        // -------------------------------------------------------


        // Define display greeting function
        function displayGreeting(){
            // Display title
            headerTitle.text(`Hello ${dataObject.recipientname},`);
            // Display Message
            headerMessage.text(`${dataObject.message}`);

            // -------------------------------------------------------
            // Give user options to choose from different greetings and audio
            // Then decide the image and audio and apply
            // Display greetingImage
            greetingImage.attr('src', `./includes/images/greetings/christmas/christmas.gif`);
            // Add Greeting Audio
            greetingAudio.attr('src', `./includes/music/musicfile-name.mp3`);
            // -------------------------------------------------------

            // Display sender name
            footerSenderName.text(`${dataObject.sendername}`);

            // -------------------------------------------------------
            // Define function to load credits from JSON data depending on audio in database(On HTTP server mode under NodeJS environment)
            // Display Credits
            footerCredits.html(`<h3>Music Credits:</h3>
            <p>Credits will come here...`);
            // -------------------------------------------------------
            
            // Test log
            console.log(dataObject.sendername);

            // Hide form
            greetingForm.css('display', 'none');
            // Display Greeting
            greetingsWrapper.css('display', 'block');
        }
        
    }
    

    // -------------------------------------------------------
    // Define function to convert array into Object
    function createObject(dataArr){
        formDataObject.type = dataArr[0];
        formDataObject.sendername = dataArr[1];
        formDataObject.recipientname = dataArr[2];
        formDataObject.message = dataArr[3];
    }
    // -------------------------------------------------------


});

