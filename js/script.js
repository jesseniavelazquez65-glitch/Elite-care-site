document.addEventListener("DOMContentLoaded", function () {

    console.log("Elite Care platform loaded successfully.");

    /* ================================================= */
    /* ================= CALENDAR SYSTEM =============== */
    /* ================================================= */

    const calendarDays =
        document.querySelectorAll(".calendar-day-large");

    const detailTitle =
        document.querySelector(".calendar-details-panel h3");

    const detailStatus =
        document.querySelector(".calendar-details-panel p");

    const appointmentInput =
        document.querySelector(
            'input[placeholder="Example: Cardiology Appointment"]'
        );

    const saveButton =
    document.querySelector(
        '#scheduler button[type="submit"]'
    );

    const deleteButton =
        document.getElementById(
            "deleteRequestBtn"
        );

    let selectedDay = null;

    /* ================================================= */
    /* ================= DAY CLICK ===================== */
    /* ================================================= */

    calendarDays.forEach(function (day) {

        if (
            day.classList.contains("empty")
        ) return;

        day.addEventListener("click", function () {

            selectedDay = day;

            /* REMOVE ACTIVE */

            calendarDays.forEach(function (removeDay) {

                removeDay.classList.remove(
                    "active-day"
                );

            });

            /* ADD ACTIVE */

            day.classList.add("active-day");

            /* GET NUMBER */

            const dayNumber =
                day.querySelector(
                    ".calendar-number"
                ).innerText;

            /* UPDATE PANEL */

            detailTitle.innerText =
                `Selected Date: May ${dayNumber}, 2026`;

            /* STATUS HANDLING */

            if (
                day.classList.contains(
                    "confirmed-day"
                )
            ) {

                detailStatus.innerText =
                    "● Confirmed & Assigned";

                detailStatus.className =
                    "status-confirmed";

            }

            else if (
                day.classList.contains(
                    "pending-day"
                )
            ) {

                detailStatus.innerText =
                    "● Pending Review";

                detailStatus.className =
                    "status-pending";

            }

            else {

                detailStatus.innerText =
                    "● Draft Scheduling";

                detailStatus.className =
                    "status-pending";

            }

        });

    });

    /* ================================================= */
    /* ================= SAVE REQUEST ================== */
    /* ================================================= */

    if (saveButton) {

    saveButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            if (!selectedDay) {

                alert(
                    "Please select a calendar day first."
                );

                return;

            }

            const appointmentText =
                appointmentInput.value.trim();

            /* REMOVE OLD EVENT */

            const oldEvent =
                selectedDay.querySelector(
                    ".calendar-event"
                );

            if (oldEvent) {

                oldEvent.remove();

            }

            /* CREATE NEW EVENT */

            const eventDiv =
                document.createElement("div");

            eventDiv.classList.add(
                "calendar-event",
                "pending-event"
            );

            eventDiv.innerText =
                appointmentText ||
                "Support Request";

            selectedDay.appendChild(eventDiv);

            /* UPDATE STATUS */

            selectedDay.classList.remove(
                "confirmed-day"
            );

            selectedDay.classList.add(
                "pending-day"
            );

            detailStatus.innerText =
                "● Pending Review";

            detailStatus.className =
                "status-pending";

           /* SAVE TO STORAGE */

/* SAVE TO STORAGE */

const transportationChecked =
    document.getElementById(
        "transportationNeeded"
    );

const requestData = {

    clientName:
        document.getElementById(
            "clientName"
        ).value,

    appointmentTime:
        document.getElementById(
            "appointmentTime"
        ).value,

    appointmentAddress:
        document.getElementById(
            "appointmentAddress"
        ).value,

    transportation:
        transportationChecked.checked
            ? "Required"
            : "Not Required",

    careNotes:
        document.getElementById(
            "careNotes"
        ).value,

    date:
        detailTitle.innerText,

    appointment:
        appointmentText ||
        "Support Request",

    status:
        "Pending Review"

};

/* GET EXISTING */

const existingRequests =
    JSON.parse(
        localStorage.getItem(
            "eliteRequests"
        )
    ) || [];

/* PUSH NEW */

existingRequests.push(
    requestData
);

/* SAVE */

localStorage.setItem(
    "eliteRequests",
    JSON.stringify(
        existingRequests
    )
);

alert(
    "Scheduling request saved successfully."
);

        }
    );
    } 
    /* ================================================= */
    /* ================= DELETE REQUEST ================ */
    /* ================================================= */

    deleteButton.addEventListener(
        "click",
        function () {

            if (!selectedDay) {

                alert(
                    "Please select a calendar day first."
                );

                return;

            }

            /* REMOVE EVENT */

            const existingEvent =
                selectedDay.querySelector(
                    ".calendar-event"
                );

            if (existingEvent) {

                existingEvent.remove();

            }

            /* REMOVE STATUS */

            selectedDay.classList.remove(
                "pending-day",
                "confirmed-day"
            );

            detailStatus.innerText =
                "● Draft Scheduling";

            detailStatus.className =
                "status-pending";

            appointmentInput.value = "";

            alert(
                "Scheduling request deleted."
            );

        }
    );

});
/* ================================================= */
/* ========== CAREGIVER AVAILABILITY CALENDAR ====== */
/* ================================================= */

const caregiverCalendarGrid =
    document.getElementById(
        "caregiverCalendarGrid"
    );

const caregiverMonthTitle =
    document.getElementById(
        "caregiverMonthTitle"
    );

const availabilityDate =
    document.getElementById(
        "availabilityDate"
    );

const availabilityStatus =
    document.getElementById(
        "availabilityStatus"
    );

const markAvailableBtn =
    document.getElementById(
        "markAvailableBtn"
    );

const markUnavailableBtn =
    document.getElementById(
        "markUnavailableBtn"
    );

const prevMonthBtn =
    document.getElementById(
        "prevMonthBtn"
    );

const nextMonthBtn =
    document.getElementById(
        "nextMonthBtn"
    );

/* ONLY RUN ON CAREGIVER PAGE */

if (caregiverCalendarGrid) {

    let currentMonth = 4;
    let currentYear = 2026;

    let selectedAvailabilityDay = null;

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    function renderCaregiverCalendar() {

        caregiverCalendarGrid.innerHTML = "";

        caregiverMonthTitle.innerText =
            `${monthNames[currentMonth]} ${currentYear}`;

        const firstDay =
            new Date(
                currentYear,
                currentMonth,
                1
            ).getDay();

        const daysInMonth =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();

        /* EMPTY DAYS */

        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const emptyDay =
                document.createElement("div");

            emptyDay.classList.add(
                "calendar-day-large",
                "empty"
            );

            caregiverCalendarGrid.appendChild(
                emptyDay
            );

        }

        /* REAL DAYS */

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const dayBox =
                document.createElement("div");

            dayBox.classList.add(
                "calendar-day-large"
            );

            dayBox.innerHTML = `
                <span class="calendar-number">
                    ${day}
                </span>
            `;

            dayBox.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(
                            "#caregiverCalendarGrid .calendar-day-large"
                        )
                        .forEach(function (d) {

                            d.classList.remove(
                                "active-day"
                            );

                        });

                    dayBox.classList.add(
                        "active-day"
                    );

                    selectedAvailabilityDay =
                        dayBox;

                    availabilityDate.innerText =
                        `${monthNames[currentMonth]} ${day}, ${currentYear}`;

                }
            );

            caregiverCalendarGrid.appendChild(
                dayBox
            );

        }

    }

    /* INITIAL RENDER */

    renderCaregiverCalendar();

    /* MONTH BUTTONS */

    prevMonthBtn.addEventListener(
        "click",
        function () {

            currentMonth--;

            if (currentMonth < 0) {

                currentMonth = 11;

                currentYear--;

            }

            renderCaregiverCalendar();

        }
    );

    nextMonthBtn.addEventListener(
        "click",
        function () {

            currentMonth++;

            if (currentMonth > 11) {

                currentMonth = 0;

                currentYear++;

            }

            renderCaregiverCalendar();

        }
    );

    /* MARK AVAILABLE */

    markAvailableBtn.addEventListener(
        "click",
        function () {

            if (!selectedAvailabilityDay)
                return;

            selectedAvailabilityDay.classList.remove(
                "pending-day"
            );

            selectedAvailabilityDay.classList.add(
                "confirmed-day"
            );

            /* REMOVE OLD EVENT */

            const existing =
                selectedAvailabilityDay.querySelector(
                    ".calendar-event"
                );

            if (existing) {

                existing.remove();

            }

            /* CREATE EVENT */

            const event =
                document.createElement("div");

            event.classList.add(
                "calendar-event",
                "confirmed-event"
            );

            event.innerText =
                "Available";

            selectedAvailabilityDay.appendChild(
                event
            );

            availabilityStatus.innerText =
                "● Available";

            availabilityStatus.className =
                "status-confirmed";

        }
    );

    /* MARK UNAVAILABLE */

    markUnavailableBtn.addEventListener(
        "click",
        function () {

            if (!selectedAvailabilityDay)
                return;

            selectedAvailabilityDay.classList.remove(
                "confirmed-day"
            );

            selectedAvailabilityDay.classList.add(
                "pending-day"
            );

            /* REMOVE OLD EVENT */

            const existing =
                selectedAvailabilityDay.querySelector(
                    ".calendar-event"
                );

            if (existing) {

                existing.remove();

            }

            /* CREATE EVENT */

            const event =
                document.createElement("div");

            event.classList.add(
                "calendar-event",
                "pending-event"
            );

            event.innerText =
                "Unavailable";

            selectedAvailabilityDay.appendChild(
                event
            );

            availabilityStatus.innerText =
                "● Unavailable";

            availabilityStatus.className =
                "status-pending";

        }
    );

}
/* ================================================= */
/* ================= LOGIN SYSTEM ================== */
/* ================================================= */

const loginForm =
    document.getElementById("loginForm");

/* ONLY RUN ON LOGIN PAGE */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const selectedRole =
                document.getElementById(
                    "roleSelect"
                ).value;

            const email =
                document.getElementById(
                    "loginEmail"
                ).value;

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            /* SIMPLE VALIDATION */

            if (!email || !password) {

                alert(
                    "Please complete all login fields."
                );

                return;

            }

            /* SAVE SESSION */

            localStorage.setItem(
                "eliteRole",
                selectedRole
            );

            localStorage.setItem(
                "eliteLoggedIn",
                "true"
            );

            /* ROLE REDIRECTS */

            if (
                selectedRole === "client"
            ) {

                window.location.href =
                    "client-portal.html";

            }

            if (
                selectedRole === "caregiver"
            ) {

                window.location.href =
                    "caregiver-portal.html";

            }

            if (
                selectedRole === "admin"
            ) {

                window.location.href =
                    "admin-dashboard.html";

            }

        }
    );

}

/* ================================================= */
/* ============== DASHBOARD PROTECTION ============= */
/* ================================================= */

const protectedPages = [

    "client-portal.html",
    "caregiver-portal.html",
    "admin-dashboard.html"

];

const currentPage =
    window.location.pathname
    .split("/")
    .pop();

const loggedIn =
    localStorage.getItem(
        "eliteLoggedIn"
    );

const role =
    localStorage.getItem(
        "eliteRole"
    );

/* BLOCK ACCESS */

if (
    protectedPages.includes(currentPage)
) {

    if (!loggedIn) {

        window.location.href =
            "login.html";

    }

    /* CLIENT RESTRICTIONS */

    if (
        currentPage ===
        "client-portal.html" &&
        role !== "client" &&
        role !== "admin"
    ) {

        window.location.href =
            "login.html";

    }

    /* CAREGIVER RESTRICTIONS */

    if (
        currentPage ===
        "caregiver-portal.html" &&
        role !== "caregiver" &&
        role !== "admin"
    ) {

        window.location.href =
            "login.html";

    }

    /* ADMIN RESTRICTIONS */

    if (
        currentPage ===
        "admin-dashboard.html" &&
        role !== "admin"
    ) {

        window.location.href =
            "login.html";

    }

}
/* ================================================= */
/* ============= ADMIN REQUEST LOADER ============== */
/* ================================================= */

const adminRequestContainer =
    document.getElementById(
        "adminRequestContainer"
    );

/* ONLY RUN ON ADMIN PAGE */

if (adminRequestContainer) {

    let storedRequests =
        JSON.parse(
            localStorage.getItem(
                "eliteRequests"
            )
        ) || [];

    function renderAdminRequests() {

        adminRequestContainer.innerHTML = "";

        /* EMPTY STATE */

        if (
            storedRequests.length === 0
        ) {

            adminRequestContainer.innerHTML = `

                <div class="portal-box">

                    <h3>
                        No Pending Requests
                    </h3>

                    <p>
                        New scheduling requests
                        will appear here automatically.
                    </p>

                </div>

            `;

            return;

        }

        /* RENDER REQUESTS */

        storedRequests.forEach(function (
            request,
            index
        ) {

            const requestCard =
                document.createElement("div");

            requestCard.classList.add(
                "portal-box"
            );

           requestCard.innerHTML = `

    <h3>
        ${request.appointment}
    </h3>

    <p>
        <strong>Client:</strong>
        ${request.clientName}
    </p>

    <p>
        <strong>Date:</strong>
        ${request.date}
    </p>

    <p>
        <strong>Appointment Time:</strong>
        ${request.appointmentTime}
    </p>

    <p>
        <strong>Address:</strong>
        ${request.appointmentAddress}
    </p>

    <p>
        <strong>Transportation:</strong>
        ${request.transportation}
    </p>

    <p>
        <strong>Care Notes:</strong>
        ${request.careNotes || "None"}
    </p>

    <p class="status-pending">

        ● ${request.status}

    </p>

    <div
        style="
            display:flex;
            gap:10px;
            margin-top:18px;
            flex-wrap:wrap;
        "
    >

        <button
            class="approveRequestBtn"
            data-index="${index}"
        >

            Approve

        </button>

        <button
            class="delete-request-btn denyRequestBtn"
            data-index="${index}"
        >

            Deny

        </button>

    </div>

`;
            adminRequestContainer.appendChild(
                requestCard
            );

        });

        /* ============================================= */
        /* ================= APPROVE =================== */
        /* ============================================= */

        document
            .querySelectorAll(
                ".approveRequestBtn"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const requestIndex =
                            button.dataset.index;

                        const approvedRequest =
                            storedRequests[
                                requestIndex
                            ];

                        /* GET EXISTING */

                        const caregiverOpportunities =
                            JSON.parse(
                                localStorage.getItem(
                                    "eliteOpportunities"
                                )
                            ) || [];

                        /* PUSH */

const updatedRequest = {

    ...approvedRequest,

    status:
        "Approved",

    caregiverStatus:
        "Awaiting Acceptance"

};

/* PUSH TO OPPORTUNITIES */

caregiverOpportunities.push(
    updatedRequest
);

                        /* SAVE */

                        localStorage.setItem(
                            "eliteOpportunities",
                            JSON.stringify(
                                caregiverOpportunities
                            )
                        );
/* SAVE APPROVED REQUESTS */

const approvedRequests =
    JSON.parse(
        localStorage.getItem(
            "eliteApprovedRequests"
        )
    ) || [];

approvedRequests.push(
    updatedRequest
);

localStorage.setItem(
    "eliteApprovedRequests",
    JSON.stringify(
        approvedRequests
    )
);
                        /* REMOVE REQUEST */

                        storedRequests.splice(
                            requestIndex,
                            1
                        );

                        localStorage.setItem(
                            "eliteRequests",
                            JSON.stringify(
                                storedRequests
                            )
                        );

                        /* REFRESH */

                        renderAdminRequests();

                    }
                );

            });

        /* ============================================= */
        /* ================= DENY ====================== */
        /* ============================================= */

        document
            .querySelectorAll(
                ".denyRequestBtn"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const requestIndex =
                            button.dataset.index;

                        const deniedRequest =
                            storedRequests[
                                requestIndex
                            ];

                        /* GET DENIED STORAGE */

                        const deniedRequests =
                            JSON.parse(
                                localStorage.getItem(
                                    "eliteDeniedRequests"
                                )
                            ) || [];

                        /* PUSH */

                        deniedRequests.push({

                            ...deniedRequest,

                            denialReason:
                                "Awaiting Review"

                        });

                        /* SAVE */

                        localStorage.setItem(
                            "eliteDeniedRequests",
                            JSON.stringify(
                                deniedRequests
                            )
                        );

                        /* REMOVE REQUEST */

                        storedRequests.splice(
                            requestIndex,
                            1
                        );

                        localStorage.setItem(
                            "eliteRequests",
                            JSON.stringify(
                                storedRequests
                            )
                        );

                        /* REFRESH */

                        renderAdminRequests();

                    }
                );

            });

    }

    /* INITIAL RENDER */

    renderAdminRequests();

}
/* ================================================= */
/* ========== CAREGIVER OPPORTUNITIES ============== */
/* ================================================= */

const caregiverOpportunityContainer =
    document.getElementById(
        "caregiverOpportunityContainer"
    );

/* ONLY RUN ON CAREGIVER PAGE */

if (caregiverOpportunityContainer) {

    let opportunities =
        JSON.parse(
            localStorage.getItem(
                "eliteOpportunities"
            )
        ) || [];

    function renderCaregiverOpportunities() {

        caregiverOpportunityContainer.innerHTML = "";

        /* EMPTY STATE */

        if (
            opportunities.length === 0
        ) {

            caregiverOpportunityContainer.innerHTML = `

                <div class="portal-box">

                    <h3>
                        No Open Opportunities
                    </h3>

                    <p>
                        Approved care assignments
                        will appear here automatically.
                    </p>

                </div>

            `;

            return;

        }

        /* RENDER OPPORTUNITIES */

        opportunities.forEach(function (
            opportunity,
            index
        ) {

            const card =
                document.createElement("div");

            card.classList.add(
                "portal-box"
            );

            card.innerHTML = `

    <h3>
        ${opportunity.appointment}
    </h3>

    <p>
        <strong>Client:</strong>
        ${opportunity.clientName}
    </p>

    <p>
        <strong>Date:</strong>
        ${opportunity.date}
    </p>

    <p>
        <strong>Appointment Time:</strong>
        ${opportunity.appointmentTime}
    </p>

    <p>
        <strong>Address:</strong>
        ${opportunity.appointmentAddress}
    </p>

    <p>
        <strong>Transportation:</strong>
        ${opportunity.transportation}
    </p>

    <p>
        <strong>Care Notes:</strong>
        ${opportunity.careNotes || "None"}
    </p>
    <button
    class="expand-card-btn"
>

    View Details

</button>

<div class="expandable-details">

    <p>
        <strong>Assignment Status:</strong>
        ${opportunity.status}
    </p>

    <p>
        <strong>Transportation:</strong>
        ${opportunity.transportation}
    </p>

    <p>
        <strong>Care Notes:</strong>
        ${opportunity.careNotes || "None"}
    </p>

</div>

    <p class="status-confirmed">

        ● ${opportunity.status}

    </p>

    <div
        style="
            display:flex;
            gap:10px;
            margin-top:18px;
            flex-wrap:wrap;
        "
    >

        <button
            class="acceptOpportunityBtn"
            data-index="${index}"
        >

            Accept Assignment

        </button>

        <button
            class="delete-request-btn declineOpportunityBtn"
            data-index="${index}"
        >

            Decline

        </button>

    </div>

`;

            caregiverOpportunityContainer.appendChild(
                card
            );

        });

        /* ============================================= */
        /* ============ ACCEPT ASSIGNMENT ============== */
        /* ============================================= */

        document
            .querySelectorAll(
                ".acceptOpportunityBtn"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const assignmentIndex =
                            button.dataset.index;

                        const acceptedAssignment =
                            opportunities[
                                assignmentIndex
                            ];

                        /* GET ACTIVE */

                        const activeAssignments =
                            JSON.parse(
                                localStorage.getItem(
                                    "eliteActiveAssignments"
                                )
                            ) || [];

                        /* UPDATE STATUS */

                        acceptedAssignment.status =
                            "Caregiver Assigned";

                        /* PUSH */

                        activeAssignments.push(
                            acceptedAssignment
                        );

                        /* SAVE */

                        localStorage.setItem(
                            "eliteActiveAssignments",
                            JSON.stringify(
                                activeAssignments
                            )
                        );

                        /* REMOVE */

                        opportunities.splice(
                            assignmentIndex,
                            1
                        );

                        localStorage.setItem(
                            "eliteOpportunities",
                            JSON.stringify(
                                opportunities
                            )
                        );

/* REFRESH */

renderCaregiverOpportunities();

                    }
                );

            });


        /* ============================================= */
        /* ============ DECLINE ASSIGNMENT ============= */
        /* ============================================= */

        document
            .querySelectorAll(
                ".declineOpportunityBtn"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const assignmentIndex =
                            button.dataset.index;

                        const declinedAssignment =
                            opportunities[
                                assignmentIndex
                            ];

                        /* GET DECLINED */

                        const declinedAssignments =
                            JSON.parse(
                                localStorage.getItem(
                                    "eliteDeclinedAssignments"
                                )
                            ) || [];

                        /* PUSH */

                        declinedAssignments.push({

                            ...declinedAssignment,

                            caregiverDecision:
                                "Declined"

                        });

                        /* SAVE */

                        localStorage.setItem(
                            "eliteDeclinedAssignments",
                            JSON.stringify(
                                declinedAssignments
                            )
                        );

                        /* REMOVE */

                        opportunities.splice(
                            assignmentIndex,
                            1
                        );

                        localStorage.setItem(
                            "eliteOpportunities",
                            JSON.stringify(
                                opportunities
                            )
                        );

                        /* REFRESH */

                        renderCaregiverOpportunities();

                    }
                );

            });

    }
/* ============================================= */
/* ============ EXPANDABLE CARDS =============== */
/* ============================================= */

document
    .querySelectorAll(
        ".expand-card-btn"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const details =
                    button.nextElementSibling;

                details.classList.toggle(
                    "expanded"
                );

                if (
                    details.classList.contains(
                        "expanded"
                    )
                ) {

                    button.innerText =
                        "Hide Details";

                }

                else {

                    button.innerText =
                        "View Details";

                }

            }
        );

    });
    /* INITIAL RENDER */

    renderCaregiverOpportunities();

}
/* ================================================= */
/* ============ ACTIVE ASSIGNMENTS ================= */
/* ================================================= */

const activeAssignmentsContainer =
    document.getElementById(
        "activeAssignmentsContainer"
    );

/* ONLY RUN ON CAREGIVER PAGE */

if (activeAssignmentsContainer) {

    const activeAssignments =
        JSON.parse(
            localStorage.getItem(
                "eliteActiveAssignments"
            )
        ) || [];

    /* EMPTY STATE */

    if (
        activeAssignments.length === 0
    ) {

        activeAssignmentsContainer.innerHTML = `

            <div class="portal-box">

                <h3>
                    No Active Assignments
                </h3>

                <p>
                    Accepted care assignments
                    will appear here automatically.
                </p>

            </div>

        `;

    }

    /* RENDER */

    activeAssignments.forEach(function (
        assignment
    ) {

        const card =
            document.createElement("div");

        card.classList.add(
            "portal-box"
        );

        card.innerHTML = `

            <h3>
                ${assignment.appointment}
            </h3>

            <p>
                ${assignment.date}
            </p>

            <p>
                Transportation:
                ${assignment.transportation}
            </p>

            <p class="status-confirmed">

                ● ${assignment.status}

            </p>

        `;

        activeAssignmentsContainer.appendChild(
            card
        );

    });

}