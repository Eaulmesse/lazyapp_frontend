"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "../components/Sidebar";
import { Mail, Lock, Trash2, CheckCircle, AlertTriangle } from "lucide-react";

export default function Profil() {
  const [currentEmail, setCurrentEmail] = useState("john@example.com");

  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMessage(null);
    setEmailError(null);

    if (!newEmail || !newEmail.includes("@")) {
      setEmailError("Veuillez saisir une adresse email valide.");
      return;
    }

    setEmailLoading(true);
    try {
      const res = await fetch("/api/user/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail })
      });

      if (!res.ok) {
        throw new Error("Endpoint indisponible");
      }

      setCurrentEmail(newEmail);
      setNewEmail("");
      setEmailMessage("Votre adresse email a été mise à jour.");
    } catch (err) {
      setEmailError("Impossible de mettre à jour l'email (API indisponible).");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    setPasswordError(null);

    if (!currentPassword || !newPassword) {
      setPasswordError("Veuillez remplir tous les champs.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("La confirmation ne correspond pas au nouveau mot de passe.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/user/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (!res.ok) {
        throw new Error("Endpoint indisponible");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Votre mot de passe a été mis à jour.");
    } catch (err) {
      setPasswordError("Impossible de mettre à jour le mot de passe (API indisponible).");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError(null);

    if (deleteConfirm !== "SUPPRIMER") {
      setDeleteError("Veuillez taper SUPPRIMER pour confirmer la suppression.");
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await fetch("/api/user", { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Endpoint indisponible");
      }

      window.location.href = "/";
    } catch (err) {
      setDeleteError("Impossible de supprimer le compte (API indisponible).");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Mon profil</h1>
              <p className="text-gray-400 mt-1">Gérez vos informations personnelles et la sécurité de votre compte</p>
            </div>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Compte
            </Badge>
          </div>

          {/* Email */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="w-5 h-5" />
                Adresse email
              </CardTitle>
              <CardDescription className="text-gray-400">
                Mettez à jour votre adresse email de connexion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateEmail} className="space-y-4">
                <div>
                  <Label htmlFor="currentEmail" className="text-gray-300">Email actuel</Label>
                  <Input id="currentEmail" value={currentEmail} readOnly className="mt-2 bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="newEmail" className="text-gray-300">Nouvel email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="nouvel-email@exemple.com"
                    className="mt-2 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    required
                  />
                </div>
                {emailError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">{emailError}</div>
                )}
                {emailMessage && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-400 text-sm">{emailMessage}</div>
                )}
                <Button
                  type="submit"
                  disabled={emailLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {emailLoading ? "Mise à jour..." : "Mettre à jour l'email"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Mot de passe */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="w-5 h-5" />
                Mot de passe
              </CardTitle>
              <CardDescription className="text-gray-400">
                Modifiez votre mot de passe et sécurisez votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-gray-300">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-2 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword" className="text-gray-300">Nouveau mot de passe</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-2 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-300">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-2 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                {passwordError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">{passwordError}</div>
                )}
                {passwordMessage && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-400 text-sm">{passwordMessage}</div>
                )}
                <Button
                  type="submit"
                  disabled={passwordLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {passwordLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Zone dangereuse */}
          <Card className="bg-red-500/5 border border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Trash2 className="w-5 h-5 text-red-400" />
                Supprimer mon compte
              </CardTitle>
              <CardDescription className="text-white  ">
                La suppression de votre compte est définitive et toutes vos données seront perdues.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deleteConfirm" className="text-gray-300">Tapez SUPPRIMER pour confirmer</Label>
                <Input
                  id="deleteConfirm"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value.toUpperCase())}
                  placeholder="SUPPRIMER"
                  className="mt-2 bg-gray-900 border-red-500/30 text-white placeholder-gray-500 focus:border-red-500"
                />
              </div>
              {deleteError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">{deleteError}</div>
              )}
              <Button
                onClick={handleDeleteAccount}
                disabled={deleteLoading || deleteConfirm !== "SUPPRIMER"}
                className="bg-red-500/100 hover:bg-red-700 text-white"
              >
                {deleteLoading ? "Suppression..." : "Supprimer mon compte"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}