import koneksi from "./koneksi.js"

//cek connection 
koneksi.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    //selecting database
    koneksi.query("use crud", (err, result) => {
        if (err) throw err;
        console.log("database changed");
    });

    //showing tables
    koneksi.query("show tables", (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // creating table
    koneksi.query(`CREATE TABLE example 
    (
        id int NOT NULL AUTO_INCREMENT,
        name VARCHAR(255), 
        address VARCHAR(255),
        PRIMARY KEY (id)
    )`, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // delete tables
    koneksi.query("DROP TABLE example", (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    //add column on table
    koneksi.query(`
    ALTER TABLE data_karyawan
    ADD test VARCHAR(12)
    `, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // insert data into table
    koneksi.query("INSERT INTO data_karyawan (nama,jabatan,test) VALUES ('test','test','test')", (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // delete data from table
    koneksi.query("DELETE FROM data_karyawan WHERE id = '2'", (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // update data in table
    koneksi.query("UPDATE data_karyawan SET nama = 'ujang' WHERE id = '3'", (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    koneksi.end();
});

