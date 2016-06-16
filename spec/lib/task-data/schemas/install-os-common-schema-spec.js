// Copyright 2016, EMC, Inc.
/* jshint node: true */

'use strict';

describe(require('path').basename(__filename), function() {
    var schemaFilePath = '/lib/task-data/schemas/install-os-common-schema.json';

    var canonical = {
        "osType": "linux",
        "version": "7",
        "repo": "http://172.31.128.1:9080/centos/7/os/x86_64",
        "rootPassword": "RackHDRocks!",
        "hostname": "rackhd-node",
        "domain": "example.com",
        "users": [
            {
                "name": "rackhd1",
                "password": "123456",
                "uid": 1010,
                "sshKey": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDJQ631/sw3D40h/6JfA+PFVy5Ofza6"
            },
            {
                "name": "rackhd2",
                "password": "123456",
            }
        ],
        "rootSshKey": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDJQ631/sw3D40h/6JfA+PFVy5Ofz6eu7ca",
        "dnsServers": [
            "172.12.88.91",
            "192.168.20.77"
        ],
        "networkDevices": [
            {
                "device": "ens802f0",
                "ipv4": {
                    "ipAddr": "192.168.1.29",
                    "gateway": "192.168.1.1",
                    "netmask": "255.255.255.0",
                    "vlanIds": [
                        104,
                        105
                    ]
                },
                "ipv6": {
                    "ipAddr": "fec0::6ab4:0:5efe:157.60.14.21",
                    "gateway": "fe80::5efe:131.107.25.1",
                    "netmask": "ffff.ffff.ffff.ffff.0.0.0.0",
                    "vlanIds": [
                        101,
                        106
                    ]
                }
            },
            {
                "device": "eth0",
                "ipv4": {
                    "ipAddr": "192.168.11.89",
                    "gateway": "192.168.11.1",
                    "netmask": "255.255.255.0"
                }
            },
            {
                "device": "ens802f1",
                "ipv6": {
                    "ipAddr": "fec0::6ab4:0:5efe:157.60.14.21",
                    "gateway": "fe80::5efe:131.107.25.1",
                    "netmask": "ffff.ffff.ffff.ffff.0.0.0.0"
                }
            },
        ],
        "kvm": true,
        "installDisk": "/dev/sda",
        "installPartitions": [
            {
                "mountPoint": "/boot",
                "size": "500",
                "fsType": "ext3"
            },
            {
                "mountPoint": "swap",
                "size": "500",
            },
            {
                "mountPoint": "/",
                "size": "auto",
                "fsType": "ext3"
            }
        ]
    };

    var positiveSetParam = {
        version: ["trusty", "6"],
        "networkDevices[0].ipv4.vlanIds[0]": [0, 1009, 4095],
        "users[0].uid": [500, 10000, 65535]
    };

    var negativeSetParam = {
        version: [7, 6.5],
        kvm: [1, 'abc'],
        "networkDevices[0].ipv4.ipAddr": ["foo/bar", "300.100.9.0"],
        "networkDevices[0].ipv4.vlanIds[0]": [-1, 4096, 10000],
        "users[0].uid": [0, 499, 65536],
        "installDisk": [-1]
    };

    var positiveUnsetParam = [
        "users",
        "networkDevices",
        "installDisk",
        "dnsServers",
        "kvm",
        "rootSshKey",
        "installPartitions",
        "users[0].sshKey",
        ["users[0].sshKey", "users[0].uid"]
    ];

    var negativeUnsetParam = [
        "version",
        "repo",
        "rootPassword",
        "domain",
        "hostname",
        "users[0].name",
        "users[1].password",
        "networkDevices[0].device",
        "networkDevices[1].ipv4.ipAddr",
        "networkDevices[2].ipv6.netmask"
    ];


    var SchemaUtHelper = require('./schema-ut-helper');
    new SchemaUtHelper(schemaFilePath, canonical).batchTest(
        positiveSetParam, negativeSetParam, positiveUnsetParam, negativeUnsetParam);
});
