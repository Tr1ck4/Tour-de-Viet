==USECASE SPECIFICATION==
- **User**:
	- User can login/register/log out
	- User can view 64 towns
	- User can view a specific a location
	- User can view detail of booking
	- User can interact with AI bot
	- User need to login to book a tour
	- User can view history of booking
	- User can change personal information
	- User can use search bar for towns/location
	- User can send feedbacks/stars for location
- **Admin**:
	- Admin must login
	- Admin can view list of 64 towns
	- Admin can use search bar for towns/location
	- Admin can add new location
	- Admin can update location information
	- Admin can delete location
	- Admin can view book tickets
- **Email Service**  (Optional): 
	- Send email confirmation

==GENERAL UI SPECIFICATION==
- **User** : 
	- Buttons for login/register/logout
	- AI bot
	- Fill form for register
	- Fill form for login
	- Head bar display (Logo, search, login/register/logout,...)
	- *Main page*:
		- Introduction page  :
			- Parallax effect
			- Snap page
			- Side button to swap location
			- Button to enter detail page
		- Detail page :
			- Detail information (Text + Images)
			- Button for booking
	- *End page* :
		- Information of page (Number, address, logo, ...)
	- *Booking page* :
		- Short information of tour
		- Fill form card information
		- Button to book -> Confirmation button (blur backside)
		- Fill form comments
		- Star rating system
	- *Information page*:
		- Fill form for customer(Sub page)
		- History page (Sub page):
			- Detail of booking information
- **Admin**:
	- *Login page* : 
		- Fill form login
		- Button to login
	- *Main page:
		- CRUD for locations (Text, image)
		- *Tickets Subpage*:
			- Tiles of tickets (2 state Before/After Date)
 
![image](https://github.com/Tr1ck4/Tour-de-Viet/assets/91774874/cd3c6f49-21f2-4a37-8887-8044cf60286c)

Database design
TownID - TownName - Tourname- Description - StartDate - EndDate - Price - Images

FlightID - FlightName - StartDate - EndDate  - Price 

UserName - Password - CitizenID - Name - Address - Age - Tel_num - Email 

UserName - Tourname  - FlightID - CardID

CardID - Cardnum - ExpirationDate - SecurityNum - OwnerName

