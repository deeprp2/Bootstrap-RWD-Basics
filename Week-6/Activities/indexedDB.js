let db = new Dexie("db");
db.version(1).stores({
    schools: 'long_name, student_attainment_rating, student_attendance_year_1'
});

window.onload = () => {
    db.schools.clear();
}

fetch('https://data.cityofchicago.org/resource/dw27-rash.json')
    .then(response => response.json())
    .then((data) => {
        data.forEach((item) => {
            db.schools.put({
                long_name: item.long_name,
                student_attainment_rating: item.student_attainment_rating,
                student_attendance_year_1: parseFloat(item.student_attendance_year_1),
                address: item.address,
                website: item.website,
                school_type: item.school_type
            })
        })
    })
    .then(() => {
        let list = document.createElement("ul")

        let schoolCount = document.createElement("li")
        db.table("schools").toArray().then((data) => schoolCount.innerHTML = `School count: ${data.length}`)
        list.appendChild(schoolCount)

        let schoolCountAvgStudentAttainment = document.createElement("li")
        db.table("schools").where("student_attainment_rating").equals("AVERAGE").count().then((data) => schoolCountAvgStudentAttainment.innerHTML = `Schools with average student attainment: ${data}`)
        list.appendChild(schoolCountAvgStudentAttainment)

        let schoolsWithHighAttendance = document.createElement("li")
        db.table("schools").where("student_attendance_year_1").aboveOrEqual(98.0).toArray().then(data => schoolsWithHighAttendance.innerHTML = `Schools with above 98.0% student attainment: [${data.map(item => item.long_name + " ")}]`)
        list.appendChild(schoolsWithHighAttendance)

        let schoolNamesPrefix = document.createElement("li")
        db.table("schools").where("long_name").startsWith("K").toArray().then(data => schoolNamesPrefix.innerHTML = `Schools with prefix K: [${data.map(item => item.long_name + " ")}]`)
        list.appendChild(schoolNamesPrefix)

        db.transaction('rw', db.schools, async () => {
            db.table("schools").each(item => {
                if (item.school_type === "Charter") {
                    db.table("schools").delete(item.long_name)
                }
            })
        }).then(() => {
            let schoolCountWithoutCharterType = document.createElement("li")
            db.table("schools").toArray().then((data) => schoolCountWithoutCharterType.innerHTML = `School count without Charter type: ${data.length}`)
            list.appendChild(schoolCountWithoutCharterType)
        }).catch(err => {
            console.error(err.stack);
        });

        document.body.appendChild(list)
    })

