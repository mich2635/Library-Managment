
/**
 * The below function register  called from "register.html".
 * This function is used to register user
 */

function register() 
{
    event.preventDefault();
    let userId=document.querySelector("#userId").value;
    let password=document.querySelector("#password").value;
    let UserDetails=JSON.parse(localStorage.getItem("UserDetails"))||[];
    let index = UserDetails.findIndex(obj => obj.userId == userId);
    //
    
    //
    if(index == -1)
    {
            let userObj = { "userId" : userId, "password": password };
            UserDetails.push(userObj);
            localStorage.setItem("UserDetails",JSON.stringify(UserDetails));
            alert("REGISTRATION SUCCESSFULL");
            window.location.href="UserLogin.html";
            
    }
    else 
    {
            alert("USERNAME ALREADY EXISTS");
    }
}

/**
 * This function is called from "UserLogin.html"
 * This function is used to login users
 */

function login() 
{
    event.preventDefault();
    
    let userId=document.querySelector("#userid").value;
    let password=document.querySelector("#password").value;
    let UserDetails=JSON.parse(localStorage.getItem("UserDetails"))||[];
    let index=UserDetails.findIndex(obj => obj.userId==userId && obj.password==password)
    if(index>=0)
    {  
         alert("LOGIN SUCCESSFULL")
        window.location.href="TakeOrReturnBook.html";
     }
     else{

         alert("WORNG USER ID OR PASSWORD!!!")
     }

}
/**
 * The below function adminRegistration are called from "AdminRegistration"
 * This function is used to register Admins.
 * 
 */


function adminRegistration()
{
    let AdminId=document.querySelector("#id").value;
    let passwordU=document.querySelector("#adminPassword").value;  
    let passwordS=passwordU.toString();
    let passstrength="@chainsys987";
    let password=passwordS.concat(passstrength);
    let adminDetails=JSON.parse(localStorage.getItem("adminDetails"))||[];
    let index=adminDetails.findIndex(obj => obj.AdminId == AdminId);
    if(index == -1)
    {
        let adminObj={"AdminId":AdminId, "Password":password}
        adminDetails.push(adminObj);
        localStorage.setItem("adminDetails",JSON.stringify(adminDetails));
        alert("REGISTRATION SUCCESSFULL");
    }
    else
    {
        alert("ADMIN USER ID ALREADY EXISTS");
    }
}

/**
 * This function is called from AdminRegistration .
 * This function is used to log in admins
 */

function adminLogin() 
{
    event.preventDefault();
    let adminUser=document.querySelector("#userid").value;
    let password=document.querySelector("#password").value;
    let adminDetails=JSON.parse(localStorage.getItem("adminDetails"))||[];
    let index=adminDetails.findIndex(obj => obj.AdminId==adminUser && obj.Password==password)
    alert(index);
        if(index>=0)
        {
                window.location.href="AdminView.html"
                alert("LOG IN SUCCESSFULL")
            
            }
            else{
                alert("ADMIN USER DOESNT EXISTS!!!");
            }
}


/**
 * This function is called from "ViewStocks.html"
 * This function is used to view all books.
 */

function viewBooks()
 {
    event.preventDefault();
    document.querySelector("#viewbooksbtn").style.visibility="hidden";
    document.querySelector(".ViewBooks").style.visibility = "visible";
    document.querySelector(".ViewBookByName").style.visibility = "hidden";
    let BooksStock=JSON.parse(localStorage.getItem("BooksStock"))||[];
    for(var i=0; i < BooksStock.length; i++)
    {
    document.getElementById("ViewBooks").innerHTML += "<p>"+"BOOK NAME  :"+BooksStock[i].BookName+"---"+"QUANTITY    :"+BooksStock[i].Quantity+"</p><br>";
    }
    document.querySelector("#ViewBooks").style.visibility = "visible";


}

/**
 * This function is called from "ViewStocks.html"
 * This function is used to view all books
 */


function viewBookByName() 
{
    event.preventDefault();
    document.querySelector(".ViewBooks").style.visibility = "hidden";
    document.querySelector(".ViewBookByName").style.visibility = "visible";
    document.querySelector("#ViewBooks").style.visibility = "hidden";
    document.querySelector("#viewbooksbtn").style.visibility="visible";
    document.getElementById("ViewBooks").innerHTML="";

}
/**
 * This function is called from ViewStocks.html.
 * This function is used to view Books by its name
 */

function ViewBookByNameForm()
{
    event.preventDefault();
    let bookname=document.querySelector("#bookname").value;
    let BooksStock=JSON.parse(localStorage.getItem("BooksStock"))||[];
    let index=BooksStock.findIndex(obj => obj.BookName==bookname);
        if(index != -1)
        {
             document.querySelector("#displayquant").value=BooksStock[index].Quantity;
        
        }
        else{
            document.querySelector("#displayquant").value=0;
        } 

}


/**
 * This fnction is called from "TakeORReturnBook.html"
 * This function is used to view TakeBook form when the 
 * button TakeBookBook is clicked 
 */

function TakeBookButton()
 {
    document.querySelector(".takebook").style.visibility = "visible";
    document.querySelector(".returnbook").style.visibility = "hidden";
  }
  
  /**
   * This function is called from "TakeorReturnBook.html"
   * This fnction is used to to view returnBook form
   */
function ReturnBookButton() 
  {
    document.querySelector(".takebook").style.visibility = "hidden";
    document.querySelector(".returnbook").style.visibility = "visible";
  }
  /**
   * This function is called from "TakeOrReturnBook.html".
   * This function adds the returned book to "BooksStock array"
   * and updates the debtuser,BooksStock,BooksQuantity  List.
   * 
   */
 
function ReturnBook()
 {
    event.preventDefault();
    let booknameR=document.querySelector("#booknameR").value;
    let userId=document.querySelector("#ID").value;
    let bookquantity=document.querySelector("#bookQuant").value;
    let BooksStock=JSON.parse(localStorage.getItem("BooksStock"))||[];
    let DebtDetails=JSON.parse(localStorage.getItem("DebtDetails"))||[]
    let debtindex=DebtDetails.findIndex(obj=>obj.DebtUsers==userId);
    let Bkindex=BooksStock.findIndex(obj=>obj.BookName==booknameR);
    console.log("Index: ", debtindex);
    if(debtindex !=-1)
    {
        
        DebtDetails[debtindex].Quantity =DebtDetails[debtindex].Quantity-bookquantity;
        alert(JSON.stringify(DebtDetails[debtindex]));

        if(DebtDetails[debtindex].Quantity==0)
        {
            DebtDetails.splice(debtindex,1);
            localStorage.setItem("DebtDetails",JSON.stringify(DebtDetails));
            BooksStock[Bkindex].Quantity-=-bookquantity;
            localStorage.setItem("BooksStock",JSON.stringify(BooksStock));
            alert("DONE");
        }
        else if(DebtDetails[debtindex].Quantity > 0)
        {
        localStorage.setItem("DebtDetails",JSON.stringify(DebtDetails));
        BooksStock[Bkindex].Quantity-=-bookquantity;
        localStorage.setItem("BooksStock",JSON.stringify(BooksStock));
        }
        else 
        {
            alert("YOUR RETURNING TOO MUCH BOOKS !!!NOT ACCEPTABLE");
        }
    }
    else
    {
         alert(" THIS USER ID DIDNT TOOK ANY BOOK");
    }

/**
 * This function is called from "TakeOrReturnBok.html".
 * This function is used to take book 
 * and update debtuser,BooksStock,BooksQuantity list
 */
 }
 function TakeBook()
{
    event.preventDefault();
    let bookname=document.querySelector("#bookname").value;
    let bookquantity=document.querySelector("#bookquantity").value;
    let debtuser=document.querySelector("#debtuser").value;
    let DebtDetails=JSON.parse(localStorage.getItem("DebtDetails"))||[]
    let BooksStock=JSON.parse(localStorage.getItem("BooksStock"))||[];
    let UserDetails=JSON.parse(localStorage.getItem("UserDetails"))||[];
    let index=BooksStock.findIndex(obj => obj.BookName==bookname);
    let deptindex=DebtDetails.findIndex(obj => obj.BookName==bookname);
    let userindex=UserDetails.findIndex(obj => obj.userId==debtuser)
    if(BooksStock[index].Quantity>=bookquantity)
    {
        if(userindex != -1)
        {
                let debtDetailsObj={"DebtUsers":debtuser,"DebtBook":bookname,"Quantity":bookquantity}
                DebtDetails.push(debtDetailsObj);
                localStorage.setItem("DebtDetails",JSON.stringify(DebtDetails));
                BooksStock[index].Quantity-=bookquantity
                localStorage.setItem("BooksStock", JSON.stringify(BooksStock));
                alert("BOOK TAKEN");
            
        }
        else{
            alert("USER ID DOESNT EXISTS")
        }
        
    }
    else{
        alert("SORRY INSUFFICIENT BOOK!!!");
    }
}


/**
 * This function is called from "adminView.html".
 * This function is used to upload available books.
 */

function uploadBooks()
{
    event.preventDefault();
    let bookname=document.querySelector("#bookName").value;
    let quantityU=document.querySelector("#quantity").value;
    let BooksStock=JSON.parse(localStorage.getItem("BooksStock"))||[];
    let index=BooksStock.findIndex(obj => obj.BookName==bookname)
    if(index == -1)
    {
        let BookObj={"BookName":bookname,"Quantity":quantityU}
        BooksStock.push(BookObj);
        localStorage.setItem("BooksStock",JSON.stringify(BooksStock));
        alert("BOOK UPLOADED SUCCESSFULL");
        }
        else 
        {
            BooksStock[index].Quantity-=-quantityU;
            localStorage.setItem("BooksStock",JSON.stringify(BooksStock));
            alert("BOOK QUANTITY UPDATED");
        }
   
  /**
   * This function is called from "AdminView.html".
   * This function is used to view UpadateBooks Form
   */

}

function viewUpdateBooksDiv()
{
    event.preventDefault();
    document.querySelector(".Listdeptusers").style.visibliity="hidden";
    document.querySelector(".updateBooks").style.visibility="visible";
    document.querySelector("#adminbtn").style.visibility="visible";
    document.getElementById("Listdeptusers").innerHTML="";
    
}
/**
 * This function is called from "AminView.html".
 * This function is used to view debt users
 */
function viewdeptuser()
    {
    event.preventDefault();
    document.querySelector(".Listdeptusers").style.visibility="visible";
    document.querySelector(".updateBooks").style.visibility="hidden";
    let DebtDetails=JSON.parse(localStorage.getItem("DebtDetails"))||[];
    
    document.getElementById("Listdeptusers").innerHTML="---ALL DEPT USERS---";
     for(var i=0; i < DebtDetails.length; i++)
    {
    document.getElementById("Listdeptusers").innerHTML += "<p>"+"USER ID  :"+DebtDetails[i].DebtUsers+"-----"+"DEPT BOOK :"+DebtDetails[i].DebtBook+"-----"+"DEPT QUANTITY   :"+DebtDetails[i].Quantity+"</p><br>";
    }
    document.querySelector("#adminbtn").style.visibility="hidden";
    
}
/**
 * This function is called from both "AdminView.html" and "Userlogin.html".
 * This function is used to log out user id and admin login.
 */
function userlogout()
{
    event.preventDefault();
    window.location.href="Firstpage.html";
}




