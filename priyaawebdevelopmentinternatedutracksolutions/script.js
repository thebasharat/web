document.addEventListener("DOMContentLoaded", function () {

    // Get all section radio buttons
    const sectionRadios =
        document.querySelectorAll('input[name="section"]');

    // Get student checkboxes
    const checkboxes =
        document.querySelectorAll(".student-checkbox");

    // Get display elements
    const sectionDisplay =
        document.getElementById("sectionDisplay");

    const submitBtn =
        document.getElementById("submitBtn");

    const presentCount =
        document.getElementById("presentCount");

    const absentCount =
        document.getElementById("absentCount");

    const attendancePercent =
        document.getElementById("attendancePercent");


    // Add change event to radio buttons
    for (let i = 0; i < sectionRadios.length; i++) {

        sectionRadios[i].addEventListener("change", function () {

            let index = 0;

            // Required while loop
            while (index < sectionRadios.length) {

                if (sectionRadios[index].checked) {

                    sectionDisplay.textContent =
                        sectionRadios[index].value;

                    break;
                }

                index++;
            }

        });
    }


    // Calculate attendance
    submitBtn.addEventListener("click", function () {

        let present = 0;


        // Required for loop
        for (let i = 0; i < checkboxes.length; i++) {

            if (checkboxes[i].checked) {

                present++;

            }

        }


        // Calculate absent students
        let absent = 0;

        let count = present;


        // Required do...while loop
        do {

            if (count < checkboxes.length) {

                absent++;

            }

            count++;

        } while (count < checkboxes.length);


        // Calculate percentage
        let percentage = 0;

        if (checkboxes.length > 0) {

            percentage =
                (present / checkboxes.length) * 100;

        }


        // Display results
        presentCount.textContent = present;

        absentCount.textContent = absent;

        attendancePercent.textContent =
            percentage.toFixed(0) + "%";

    });

});