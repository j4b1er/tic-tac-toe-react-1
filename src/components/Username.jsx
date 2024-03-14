import { useState } from "react";

export default function Username({ onCreateUsername }) {
  const [newUser, setNewUser] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onCreateUsername(newUser);
  }

  return (
    <form className="userName" onSubmit={handleSubmit}>
      <input
        value={newUser}
        type="text"
        maxLength={8}
        placeholder="Create a username..."
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button>Save</button>
    </form>
  );
}
