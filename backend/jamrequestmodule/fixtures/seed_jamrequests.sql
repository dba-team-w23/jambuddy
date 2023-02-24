BEGIN;
INSERT INTO public.jamrequestmodule_jamrequest("location", status, created, exp_level_id, genreid_id, instrumentid_id, profileid_id)
VALUES
('San Francisco', 'Open', '2023-02-05 12:00:00', 1, 1, 1, 1),
('New York', 'Open', '2023-02-05 12:01:00', 2, 2, 2, 5),
('Los Angeles', 'Closed', '2023-02-05 12:02:00', 3, 3, 3, 6),
('New York', 'Open', '2023-02-05 13:00:00', 2, 2, 2, 7),
('Paris', 'Open', '2023-02-05 15:00:00', 2, 4, 3, 8),
('London', 'Open', '2023-02-05 14:00:00', 3, 3, 3, 5),
('Berlin', 'Open', '2023-02-05 16:00:00', 3, 5, 1, 7),
('Rome', 'Open', '2023-02-05 17:00:00', 3, 6, 1, 6);
COMMIT;
