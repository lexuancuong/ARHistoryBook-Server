INSERT INTO Achievement
VALUES ('Achv000001','LAN DAU','Lan dau hoan thanh mot khu vuc'),
('Achv000002','LAN HAI','Hoan thanh 2 khu vuc'),
('Achv000003','TIEN BO TUNG NGAY','Cai thien diem so cua 1 khu vuc, hoac dat diem toi da tai 1 khu vuc');

INSERT INTO AchievementCriterion
VALUES ('Accrit0001','NUM_khu_vuc_hoan_thanh','So khu vuc da hoan thanh'),
('Accrit0002','NUM_diem_cao_hon','Diem so cua 1 khu vuc so voi ket qua cao nhat truoc do la cao hon'),
('Accrit0003','NUM_diem_toi_da','So khu vuc dat diem toi da');

INSERT INTO AchievementCriterionAchievement(accrit_id, achv_id)
VALUES ('Accrit0001','Achv000001'),
('Accrit0001','Achv000002'),
('Accrit0002','Achv000003'),
('Accrit0003','Achv000003');

INSERT INTO AccountAchievementCriterion(user_id,accrit_id,Count)
VALUES ('0','Accrit0001',0),
('0','Accrit0002',0),
('0','Accrit0003',0);

INSERT INTO SectionData 
VALUES ('Sec0000001','Hoa Sen Ban Dau','Lsn000001'),
('Sec0000002','Tim kiem vi tri','Lsn000002'),
('Sec0000003','Di tim kho bau','Lsn000002');

INSERT INTO ActivityData
VALUES ('Act0000001',0,'Ban Dau',TRUE,100,'Sec0000001'),
('Act0000002',0,'Vi tri',FALSE,0,'Sec0000002'),
('Act0000003',0,'Tim kiem',TRUE,300,'Sec0000002'),
('Act0000004',0,'Kho Bau 1',TRUE,50,'Sec0000003');


INSERT INTO SectionLink
VALUES ('Sec0000001','Sec0000002'),
('Sec0000002','Sec0000003');

INSERT INTO Account (username,Password,Type)
VALUES ('huy_hcmus_052',123456,1);

INSERT INTO Users (user_id,name,school,rank,class,score,email,phone)
VALUES (2,'Tran Duc Huy','THCS Nguyen Vinh Nghiep',6,0,0,'duchuy291199@gmail.com',123456789);


INSERT INTO Collection (id,name,description,style,user_id)
VALUES ('Clt000001','Huys Collection','Bo suu tap cool ngau cua Huy','',0);

INSERT INTO Artifact(id,Name,Description)
VALUES ('Arti000001','Hoa sen','Hoa sen n�y __ cho vui!'),
('Arti000002','test2','test desp 2');

INSERT INTO SectionProgress(user_id,sec_id,status,score,type)
VALUES (0,'Sec0000001',0,0,1),
(0,'Sec0000002',0,0,1),
(0,'Sec0000003',0,0,1);

INSERT INTO ActivityProgress(id,Score,Done,user_id,sec_id)
VALUES ('aP00000011',0,FALSE,0,'Sec0000001'),
('aP00000012',0,FALSE,0,'Sec0000001'),
('aP00000021',0,FALSE,0,'Sec0000002'),
('aP00000022',0,FALSE,0,'Sec0000002'),
('aP00000031',0,FALSE,0,'Sec0000002'),
('aP00000032',0,FALSE,0,'Sec0000002'),
('aP00000041',0,FALSE,0,'Sec0000003'),
('aP00000042',0,FALSE,0,'Sec0000003');

INSERT INTO SectionStatus
VALUES (0,'Sec0000001',1),
(0,'Sec0000002',0),
(0,'Sec0000003',0); 