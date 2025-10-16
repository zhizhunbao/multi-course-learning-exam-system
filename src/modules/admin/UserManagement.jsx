import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  Input,
  Modal,
  Alert,
} from "../../../common/modules/Elements";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleToggleUserStatus = async (user) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `/api/admin/users/${user.id}/toggle-status`,
        {
          method: "PATCH",
        }
      );
      const updatedUser = await response.json();
      setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    } catch (err) {
      setError("Failed to update user status");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (value, user) => (
        <div className="user-info">
          <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <div className="user-name">{value}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (value) => (
        <span className={`role-badge role-${value.toLowerCase()}`}>
          {value}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          {value}
        </span>
      ),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, user) => (
        <div className="user-actions">
          <Button
            variant="outline"
            size="small"
            onClick={() => handleEditUser(user)}
          >
            Edit
          </Button>
          <Button
            variant={user.status === "active" ? "warning" : "success"}
            size="small"
            onClick={() => handleToggleUserStatus(user)}
          >
            {user.status === "active" ? "Deactivate" : "Activate"}
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => handleDeleteUser(user)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="user-management">
      <div className="user-header">
        <h2>User Management</h2>
        <div className="user-actions-header">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button variant="primary">Add New User</Button>
        </div>
      </div>

      <Card className="users-table-card">
        <Table
          data={filteredUsers}
          columns={columns}
          loading={loading}
          emptyMessage="No users found"
        />
      </Card>

      {/* User Edit Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="Edit User"
        size="medium"
      >
        {selectedUser && (
          <div className="user-edit-form">
            <div className="form-group">
              <label>Name</label>
              <Input value={selectedUser.name} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <Input value={selectedUser.email} />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select className="form-select">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-actions">
              <Button
                variant="secondary"
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete User"
        size="small"
      >
        {selectedUser && (
          <div className="delete-confirmation">
            <p>
              Are you sure you want to delete user{" "}
              <strong>{selectedUser.name}</strong>?
            </p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="form-actions">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete User
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
