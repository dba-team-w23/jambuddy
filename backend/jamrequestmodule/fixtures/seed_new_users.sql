BEGIN;

INSERT INTO public.jamrequestmodule_profile (
    "password",
    last_login,
    is_superuser,
    username,
    first_name,
    last_name,
    is_staff,
    is_active,
    date_joined,
    email,
    street,
    street2,
    city,
    state,
    zipcode,
    phone,
    photo,
    note,
    created,
    exp_level,
    genres,
    instruments
)
VALUES (
    'password',
    NULL,
    FALSE,
    'johhhhny',
    'John',
    'Smith',
    FALSE,
    TRUE,
    '2023-02-26 10:15:25.714072+00',
    'john.smith@example.com',
    '123 Main St',
    NULL,
    'Anytown',
    'CA',
    '12345',
    '555-123-4567',
    'https://source.unsplash.com/random/?woman&$59',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut nisi id erat varius hendrerit eu in ipsum. Nullam ac diam at nibh convallis vulputate. Sed ut elit faucibus, imperdiet quam ut, maximus est. Nullam ut leo nisl. Praesent mattis, ipsum eget semper feugiat, ex massa sollicitudin orci, vel sagittis mauris ex sit amet justo. Nullam porta volutpat lorem eu laoreet. Nullam id ante vel est congue interdum. Nulla facilisi. Nam id tellus imperdiet, tincidunt nunc sed, aliquet quam.',
    '2023-02-26 10:15:25.714072+00',
    'Intermediate',
    '{"Rock", "Blues"}',
    '{"Guitar", "Drums"}'
);

INSERT INTO public.jamrequestmodule_profile (
    "password",
    last_login,
    is_superuser,
    username,
    first_name,
    last_name,
    is_staff,
    is_active,
    date_joined,
    email,
    street,
    street2,
    city,
    state,
    zipcode,
    phone,
    photo,
    note,
    created,
    exp_level,
    genres,
    instruments
)
VALUES (
    'password',
    NULL,
    FALSE,
    'amyybrown',
    'Amy',
    'Brown',
    FALSE,
    TRUE,
    '2023-02-26 10:20:12.714072+00',
    'amy.brown@example.com',
    '456 Oak St',
    NULL,
    'Othertown',
    'CA',
    '54321',
    '555-987-6543',
    'https://source.unsplash.com/random/?man&$303',
    'Nulla facilisi. Sed ultrices dolor vel urna tristique congue. Morbi luctus, lectus ac imperdiet pellentesque, lacus sapien fermentum neque, euismod tristique elit elit ut elit. Integer ut sagittis urna. In tincidunt ex vitae sapien pharetra, in gravida diam facilisis. Integer eleifend mi vitae consequat rhoncus. Nulla auctor tortor sapien, vel auctor mauris tincidunt non.',
    '2023-02-26 10:20:12.714072+00',
    'Advanced',
    '{"Jazz", "Funk"}',
    '{"Bass", "Keyboard"}'
);

INSERT INTO public.jamrequestmodule_profile (
    "password",
    last_login,
    is_superuser,
    username,
    first_name,
   last_name,
is_staff,
is_active,
date_joined,
email,
street,
street2,
city,
state,
zipcode,
phone,
photo,
note,
created,
exp_level,
genres,
instruments
)
VALUES (
'password',
NULL,
FALSE,
'karlee',
'Karen',
'Lee',
FALSE,
TRUE,
'2023-02-26 11:30:45.714072+00',
'karen.lee@example.com',
'789 Maple St',
'Apt 2B',
'Smallville',
'CA',
'67890',
'555-555-1212',
'https://source.unsplash.com/random/?man&$156',
'Fusce nec varius arcu. Duis elementum, tortor vel interdum hendrerit, lorem augue facilisis lacus, sit amet sodales velit ipsum ut',
'2023-02-26 11:30:45.714072+00',
NULL,
NULL,
NULL
);

INSERT INTO public.jamrequestmodule_profile (password, last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('default_password', NULL, false, 'JWilson1', 'James', 'Wilson', false, true, '2023-02-25T08:03:17.714072Z', 'james.wilson@gmail.com', '1985 Corbin Branch Road', NULL, 'Cleveland', 'Tennessee', '37311', '423-479-7597', 'https://source.unsplash.com/random/?man&$59', NULL, '2023-02-26T00:00:00.000000Z', NULL, NULL, NULL);

INSERT INTO public.jamrequestmodule_profile (password, last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('default_password', NULL, false, 'EDiaz2', 'Emma', 'Diaz', false, true, '2023-02-25T08:03:17.765482Z', 'emma.diaz@gmail.com', '3294 Pine Tree Lane', NULL, 'Washington', 'District of Columbia', '20005', '202-480-6187', 'https://source.unsplash.com/random/?woman&$303', NULL, '2023-02-26T00:00:00.000000Z', NULL, NULL, NULL);

INSERT INTO public.jamrequestmodule_profile (password, last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('default_password', NULL, false, 'elKClark3', 'Karen', 'Clark', false, true, '2023-02-25T08:03:17.822714Z', 'karen.clark@gmail.com', '3546 Hilltop Drive', NULL, 'Saco', 'Maine', '04072', '207-602-5593', 'https://source.unsplash.com/random/?man&$156', NULL, '2023-02-26T00:00:00.000000Z', NULL, NULL, NULL);


INSERT INTO public.jamrequestmodule_profile (
"password",
last_login,
is_superuser,
username,
first_name,
last_name,
is_staff,
is_active,
date_joined,
email,
street,
street2,
city,
state,
zipcode,
phone,
photo,
note,
created,
exp_level,
genres,
instruments
) VALUES (
'password',
null,
false,
'KClark3',
'Karen',
'Clark',
false,
true,
'2023-02-25T08:03:17.822714Z',
'karen.clark@gmail.com',
'3546 Hilltop Drive',
null,
'Saco',
'Maine',
'04072',
'207-602-5593',
'https://source.unsplash.com/random/?man&$156',
null,
'2023-02-26T00:00:00.000000Z',
null,
null,
null
);

INSERT INTO public.jamrequestmodule_profile (
"password",
last_login,
is_superuser,
username,
first_name,
last_name,
is_staff,
is_active,
date_joined,
email,
street,
street2,
city,
state,
zipcode,
phone,
photo,
note,
created,
exp_level,
genres,
instruments
) VALUES (
'password',
null,
false,
'PHernandez4',
'Paul',
'Hernandez',
false,
true,
'2023-02-25T08:03:17.873389Z',
'paul.hernandez@gmail.com',
'1885 Briarwood Drive',
null,
'Toledo',
'Ohio',
'43615',
'419-215-9410',
'https://source.unsplash.com/random/?woman&$436',
null,
'2023-02-26T00:00:00.000000Z',
null,
null,
null
);

INSERT INTO public.jamrequestmodule_profile (
"password",
last_login,
is_superuser,
username,
first_name,
last_name,
is_staff,
is_active,
date_joined,
email,
street,
street2,
city,
state,
zipcode,
phone,
photo,
note,
created,
exp_level,
genres,
instruments
) VALUES (
'password',
null,
false,
'LRogers1',
'Linda',
'Rogers',
false,
true,
'2023-02-25T08:03:17.714072Z',
'linda.rogers@gmail.com',
'3204 Winding Way',
null,
'Tyler',
'Texas',
'75703',
'903-509-1252',
'https://source.unsplash.com/random/?woman&$156',
null,
'2023-02-26T00:00:00.000000Z',
null,
null,
null
);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'CSanchez1', 'Carlos', 'Sanchez', false, false, '2023-02-25T08:03:17.714072Z', 'carlos.sanchez@gmail.com', '3785 Benson Park Drive', null, 'Elkridge', 'Maryland', '21075', '410-379-6280', 'https://source.unsplash.com/random/?man&$436', null, '2023-02-26T00:00:00.000000Z', null, null, null);

INSERT INTO public.jamrequestmodule_profile (
"password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email,
street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments
) VALUES (
'', null, false, 'KHall1', 'Karen', 'Hall', false, true, '2023-02-25T08:03:17.714072Z', 'karen.hall@gmail.com',
'3535 Westfall Avenue', null, 'Baltimore', 'Maryland', '21215', '410-367-1947',
'https://source.unsplash.com/random/?woman&$303', null, '2023-02-26T00:00:00.000000Z', null, null, null
);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'PPatel1', 'Prakash', 'Patel', false, false, '2023-02-25T08:03:17.714072Z', 'prakash.patel@gmail.com', '2921 Abigail Drive', null, 'Redwood City', 'California', '94061', '650-339-9040', 'https://source.unsplash.com/random/?man&$156', null, NOW(), null, null, null);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'musiclover93', 'Emily', 'Johnson', false, true, '2023-02-26T07:12:01.421097Z', 'emily.johnson@gmail.com', '123 Main St', null, 'Los Angeles', 'California', '90001', '555-1234', 'https://source.unsplash.com/random/?woman&$156', 'Looking for a band to jam with!', '2023-02-26T07:12:01.421097Z', 'Intermediate', '["rock", "pop"]', '["guitar", "piano"]');

INSERT INTO public.jamrequestmodule_profile (
"password",
last_login,
is_superuser,
username,
first_name,
last_name,
is_staff,
is_active,
date_joined,
email,
street,
street2,
city,
state,
zipcode,
phone,
photo,
note,
created,
exp_level,
genres,
instruments
)
VALUES (
'',
null,
false,
'drummerboy',
'Adam',
'Lee',
false,
true,
'2023-02-26T07:23:09.949738Z',
'adam.lee@gmail.com',
'456 Oak St',
null,
'Seattle',
'Washington',
'98101',
'555-5678',
'https://source.unsplash.com/random/?man&$436',
null,
now(),
'Advanced',
'rock',
'{drums}'
);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments) VALUES ('', null, false, 'pianogirl', 'Sophie', 'Nguyen', false, true, '2023-02-26T07:38:55.168934Z', 'sophie.nguyen@gmail.com', '789 Broadway', 'Apt 3B', 'New York', 'New York', '10001', '555-9012', 'https://source.unsplash.com/random/?woman&$809', 'Interested in classical music collaborations', '2023-02-26T07:38:55.168934Z', 'Intermediate', '["classical", "jazz"]', '["piano", "violin"]');

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'AmyS', 'Amy', 'Smith', false, true, '2022-09-11T20:47:51.981497Z', 'amy.smith@gmail.com', '123 Main Street', 'Apt 4', 'San Francisco', 'California', '94102', '415-555-1234', 'https://source.unsplash.com/random/?woman&$303', 'I''m a classically trained pianist and love playing jazz in my free time!', NOW(), 'intermediate', 'classical, jazz', 'piano');

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'AReed2', 'Ashley', 'Reed', false, false, '2023-02-25T08:03:17.714072Z', 'ashley.reed@gmail.com', '2389 Melville Street', null, 'Memphis', 'Tennessee', '38111', '901-854-2048', 'https://source.unsplash.com/random/?woman&$521', null, now(), null, null, null);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'JBailey1', 'Jennifer', 'Bailey', false, false, '2023-02-25T08:03:17.714072Z'::timestamptz, 'jennifer.bailey@gmail.com', '1845 Lodgeville Road', null, 'Minneapolis', 'Minnesota', '55401', '612-474-2497', 'https://source.unsplash.com/random/?woman&$647', null, NOW(), null, null, null);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'BCarter3', 'Brandon', 'Carter', false, true, '2023-02-25T08:03:17.714072Z'::timestamp with time zone, 'brandon.carter@gmail.com', '1421 Orchard Street', null, 'Kansas City', 'Missouri', '64106', '816-842-1123', 'https://source.unsplash.com/random/?man&$981', null, NOW()::timestamp with time zone, null, null, null);

INSERT INTO public.jamrequestmodule_profile (
"password", last_login, is_superuser, username, first_name, last_name, is_staff,
is_active, date_joined, email, street, street2, city, state, zipcode, phone,
photo, note, created, exp_level, genres, instruments
) VALUES (
'password', null, false, 'LMurphy2', 'Linda', 'Murphy', false,
true, '2023-02-25T08:03:17.714072Z', 'linda.murphy@gmail.com', '1858 Cecil Street', null,
'Omaha', 'Nebraska', '68108', '402-346-1365', 'https://source.unsplash.com/random/?woman&$303',
null, NOW(), null, null, null
);


INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments) VALUES ('', null, true, 'ABarnes2', 'Aaron', 'Barnes', true, true, '2023-02-25T08:03:17.714072Z', 'aaron.barnes@gmail.com', '3095 Circle Drive', null, 'Las Vegas', 'Nevada', '89101', '702-382-2204', 'https://source.unsplash.com/random/?man&2343', null, NOW(), null, null, null);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, true, 'LTaylor3', 'Laura', 'Taylor', false, true, '2023-02-25T08:03:36.621901Z', 'laura.taylor@gmail.com', '3832 Lincoln Drive', null, 'Marlboro', 'New Jersey', '07746', '732-462-1197', 'https://source.unsplash.com/random/?woman&$470', null, now(), null, null, null);

INSERT INTO public.jamrequestmodule_profile ("password", last_login, is_superuser, username, first_name, last_name, is_staff, is_active, date_joined, email, street, street2, city, state, zipcode, phone, photo, note, created, exp_level, genres, instruments)
VALUES ('', null, false, 'SGonzalez4', 'Samantha', 'Gonzalez', false, true, '2023-02-25T08:03:36.627659Z', 'samantha.gonzalez@gmail.com', '1059 Copperhead Road', null, 'Stevensville', 'Maryland', '21666', '410-643-2253', 'https://source.unsplash.com/random/?woman&$156', null, NOW(), null, null, null);

INSERT INTO public.jamrequestmodule_profile ("password", "last_login", "is_superuser", "username", "first_name", "last_name", "is_staff", "is_active", "date_joined", "email", "street", "street2", "city", "state", "zipcode", "phone", "photo", "note", "created", "exp_level", "genres", "instruments")
VALUES ( '', null, false, 'AJones5', 'Adam', 'Jones', false, true, '2023-02-25T08:03:36.633294Z', 'adam.jones@gmail.com', '1447 Pearlman Avenue', null, 'Cambridge', 'Massachusetts', '02141', '617-661-8213', 'https://source.unsplash.com/random/?man&$156', null, NOW(), null, null, null);

INSERT INTO public.jamrequestmodule_profile (
"password",
last_login,
is_superuser,
username,
first_name,
last_name,
is_staff,
is_active,
date_joined,
email,
street,
street2,
city,
state,
zipcode,
phone,
photo,
note,
created,
exp_level,
genres,
instruments
) VALUES (
'',
null,
false,
'CMitchell6',
'Catherine',
'Mitchell',
false,
true,
'2023-02-25T08:03:36.638785Z',
'catherine.mitchell@gmail.com',
'3704 Meadow Lane',
null,
'Orlando',
'Florida',
'32803',
'407-896-3583',
'https://source.unsplash.com/random/?woman&$647',
null,
'2023-02-26T06:52:41.691575Z',
null,
null,
null
);

COMMIT;