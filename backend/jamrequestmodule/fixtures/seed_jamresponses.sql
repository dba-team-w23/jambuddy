BEGIN;

INSERT INTO public.jamrequestmodule_jamresponse (created, note, status, jrid_id, profileid_id)
VALUES
(NOW(), 'Sounds like a great jam session!', 'Accepted', 25, 7),
(NOW(), 'Youve got a nice melody!', 'Accepted', 26, 8),
(NOW(), 'Impressive skills, I want to join', 'Accepted', 27, 9),
(NOW(), 'Sounds perfect', 'Accepted', 28, 10),
(NOW(), 'Fantastic idea, I will be there', 'Accepted', 29, 11),
(NOW(), 'Awesome music!', 'Accepted', 30, 12),
(NOW(), 'Excellent plan', 'Accepted', 31, 13),
(NOW(), 'Need a drummer', 'Accepted', 32, 14);

COMMIT;
