INSERT INTO accounts (userName, password, citizenID, name, address, age, telNum, email) VALUES ("exampleUser1","password1","VN23192748","User1","Random address",18,"125-215-2678","anything1@gmail.com");
INSERT INTO accounts (userName, password, citizenID, name, address, age, telNum, email) VALUES ("exampleUser2","password2","VN23192748","User2","Random address",18,"125-215-2678","anything2@gmail.com");
INSERT INTO accounts (userName, password, citizenID, name, address, age, telNum, email) VALUES ("exampleUser3","password3","VN23192748","User3","Random address",18,"125-215-2678","anything3@gmail.com");
INSERT INTO accounts (userName, password, citizenID, name, address, age, telNum, email) VALUES ("exampleUser4","password4","VN23192748","User4","Random address",18,"125-215-2678","anything4@gmail.com");
INSERT INTO accounts (userName, password, citizenID, name, address, age, telNum, email) VALUES ("exampleUser5","password5","VN23192748","User5","Random address",18,"125-215-2678","anything5@gmail.com");

INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("P3123","2024-06-05","2024-06-07",100000,"Station 1 Port A","Station 1 Port B","Plane");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("P231","2024-06-05","2024-06-07",100000,"Station 2 Port A","Station 2 Port B","Plane");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("B3213","2024-06-05","2024-06-08",1200000,"Station 3 Port A","Station 1 Port B","Bus");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("C31257","2024-06-05","2024-06-07",1300000,"Station 2 Port A","Station 4 Port B","Coach");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("P2937","2024-06-05","2024-06-08",1100000,"Station 11 Port A","Station 12 Port B","Plane");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("B3213","2024-06-05","2024-06-05",1200000,"Station 12 Port A","Station 31 Port B","Coach");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("B3213","2024-06-05","2024-06-07",1100000,"Station 13 Port A","Station 11 Port B","Boat");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("B7695","2024-06-05","2024-06-07",1300000,"Station 14 Port A","Station 11 Port B","Plane");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("C3945","2024-06-05","2024-06-05",1200000,"Station 11 Port A","Station 21 Port B","Coach");
INSERT INTO transportations (Name, startDate, endDate, price, goFrom, arriveAt, type) VALUES("C4526","2024-06-05","2024-06-05",1900000," tation 21 Port A","Station 31 Port B","Coach");


INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(1,"Tour 1", '{"Header": null,"Content":"What ever"}', "Tourism location", 1000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(2,"Tour 2", '{"Header": null,"Content":"What ever"}', "Entertainment location", 2000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(3,"Tour 3", '{"Header": null,"Content":"What ever"}', "Spa", 3000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(4,"Tour 4", '{"Header": null,"Content":"What ever"}', "Sporting activity", 2000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(5,"Tour 5", '{"Header": null,"Content":"What ever"}', "Tourism location",1500000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(6,"Tour 6", '{"Header": null,"Content":"What ever"}', "Culinary",1600000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(7,"Tour 7", '{"Header": null,"Content":"What ever"}', "Tourism location",1100000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(8,"Tour 8", '{"Header": null,"Content":"What ever"}', "Tourism location",10300000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(9,"Tour 9", '{"Header": null,"Content":"What ever"}', "Tour",10200000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(10,"Tour 10", '{"Header": null,"Content":"What ever"}', "Culinary",10400000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(11,"Tour 11", '{"Header": null,"Content":"What ever"}', "Entertainment location",10200000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(12,"Tour 12", '{"Header": null,"Content":"What ever"}', "Culinary",12000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(13,"Tour 13", '{"Header": null,"Content":"What ever"}', "Sporting activity",11000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(14,"Tour 14", '{"Header": null,"Content":"What ever"}', "Sporting activity",13000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(15,"Tour 15", '{"Header": null,"Content":"What ever"}', "Culinary",12000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(16,"Tour 16", '{"Header": null,"Content":"What ever"}', "Tour",14000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(17,"Tour 17", '{"Header": null,"Content":"What ever"}', "Entertainment location",15000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(18,"Tour 18", '{"Header": null,"Content":"What ever"}', "Culinary",17000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(19,"Tour 19", '{"Header": null,"Content":"What ever"}', "Culinary",11000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(20,"Tour 20", '{"Header": null,"Content":"What ever"}', "Sporting activity",12000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(21,"Tour 21", '{"Header": null,"Content":"What ever"}', "Culinary",13000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(22,"Tour 22", '{"Header": null,"Content":"What ever"}', "Spa",14000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(23,"Tour 23", '{"Header": null,"Content":"What ever"}', "Spa",11000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(24,"Tour 24", '{"Header": null,"Content":"What ever"}', "Spa",2100000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(25,"Tour 25", '{"Header": null,"Content":"What ever"}', "Entertainment location",4100000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(26,"Tour 26", '{"Header": null,"Content":"What ever"}', "Culinary",6100000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(27,"Tour 27", '{"Header": null,"Content":"What ever"}', "Entertainment location",13000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(28,"Tour 28", '{"Header": null,"Content":"What ever"}', "Culinary",12000000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(29,"Tour 29", '{"Header": null,"Content":"What ever"}', "Culinary",10120000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(30,"Tour 30", '{"Header": null,"Content":"What ever"}', "Entertainment location",10300000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(31,"Tour 31", '{"Header": null,"Content":"What ever"}', "Tour",10794000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(32,"Tour 32", '{"Header": null,"Content":"What ever"}', "Tour",10600000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(33,"Tour 33", '{"Header": null,"Content":"What ever"}', "Culinary",10400000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(34,"Tour 34", '{"Header": null,"Content":"What ever"}', "Spa",10500000,null);
INSERT INTO tours (townID, tourName, description, category, price,  transportationID) VALUES(35,"Tour 35", '{"Header": null,"Content":"What ever"}', "Spa",10430000,null);


INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 16", "2024-06-05" ,"2024-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 17", "2024-06-05" ,"2024-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 18", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 19", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 20", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 21", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 22", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 23", "2024-06-05" ,"2024-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 24", "2024-06-05" ,"2024-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 25", "2024-06-05" ,"2024-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 26", "2024-06-05" ,"2024-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 27", "2024-06-05" ,"2024-06-09");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 28", "2024-06-05" ,"2024-06-09");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 29", "2024-06-05" ,"2024-06-09");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 30", "2024-06-05" ,"2024-06-09");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 31", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 32", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 33", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 34", "2024-06-05" ,"2024-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 35", "2024-06-05" ,"2024-06-05");

INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 1", "2023-06-06" ,"2023-06-06");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 2", "2023-06-06" ,"2023-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 3", "2023-06-06" ,"2023-06-05");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 4", "2023-06-07" ,"2023-06-06");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 5", "2023-06-07" ,"2023-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 6", "2023-06-07" ,"2023-06-08");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 7", "2023-06-06" ,"2023-06-08");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 8", "2023-06-07" ,"2023-06-08");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 9", "2023-06-08" ,"2023-06-10");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 10", "2023-06-06" ,"2023-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 11", "2023-06-05" ,"2023-06-07");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 12", "2023-06-05" ,"2023-06-09");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 13", "2023-06-05" ,"2023-06-09");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 14", "2023-06-05" ,"2023-07-01");
INSERT INTO tour_date ( tourName, startDate, endDate) VALUES("Tour 15", "2023-06-05" ,"2023-07-01");


INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser1", "Tour 1", 1, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser1", "Tour 2", 9, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser1", "Tour 9", 1, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser2", "Tour 2", 3, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser2", "Tour 3", 6, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser2", "Tour 4", 1, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser3", "Tour 1", 1, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser4", "Tour 35", 5, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser1", "Tour 11", 1, 354786293);
INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES ("exampleUser1", "Tour 18", 5, 354786293);

INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (1, "Tour 1", "The tour was breathtaking! The sights were stunning and the guide was very knowledgeable.", "exampleUser1", 5);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (2, "Tour 2", "I had a great time on this tour. The transportation was comfortable and the itinerary was well-planned.", "exampleUser2", 4);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (1, "Tour 1", "Disappointed with the tour. The transportation was late and the guide seemed uninterested.", "exampleUser3", 2);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (35, "Tour 35", "Highly recommend this tour! The experience was unforgettable and worth every penny.", "exampleUser4", 5);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (2, "Tour 2", "Average tour. Nothing exceptional but nothing terrible either.", "exampleUser1", 3);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (9, "Tour 9", "The tour exceeded my expectations! The guide was fantastic and the views were spectacular.", "exampleUser1", 5);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (3, "Tour 3", "Great tour for the price. Would recommend for anyone visiting the area.", "exampleUser2", 4);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (4, "Tour 4", "Fantastic experience overall. Would love to do it again sometime.", "exampleUser2", 5);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (11, "Tour 11", "The tour was okay. Expected a bit more considering the price.", "exampleUser1", 3);
INSERT INTO comments (townID, tourName, comment, userName, rating) VALUES (18, "Tour 18", "Disappointed with the tour. The transportation was uncomfortable and the guide was unprofessional.", "exampleUser1", 2);





