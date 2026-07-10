function login(){
    alert("Login Successful!");
}

function signup(){
    alert("Signup Successful!");
}

document.getElementById("bookBtn").addEventListener("click", function(){
     alert("Booking saved");
     
    const data = {
        name: document.getElementById("customer_name").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        booking_time: document.getElementById("booking_time").value,
        people: document.getElementById("people").value
    };

    fetch("/book", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.text())
    .then(msg=>{
        alert(msg);
        loadBookings();
    });
});

function loadBookings(){

    fetch("/bookings")
    .then(res=>res.json())
    .then(data=>{

        console.log(data);
        
        let table=document.getElementById("bookingTable");

        table.innerHTML="";

        document.getElementById("totalBookings").innerText=data.length;

        data.forEach(item=>{

            table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>${item.date.substring(0,10)}</td>
                <td>${item.booking_time}</td>
                <td>${item.people}</td>
            </tr>
            `;
        });
    });
}

window.onload = loadBookings;