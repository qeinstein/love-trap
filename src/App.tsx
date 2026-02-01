/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import confetti from "canvas-confetti";
import { Heart, Volume2, VolumeX, Check, ShieldCheck, PenTool, User, Target, Calendar } from "lucide-react";
import { Howl } from "howler";

const sounds = {
  heartbeat: new Howl({ 
    src: ["https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3"], 
    loop: true, 
    volume: 0.2 
  }),
  click: new Howl({ src: ["https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"], volume: 0.3 }),
  success: new Howl({ src: ["https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3"], volume: 0.5 }),
};

function HeritageBackground() {
  return (
    <div style={styles.canvasContainer}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <Stars radius={100} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1.8, 64, 64]} position={[-2, 1, -3]}>
            <MeshDistortMaterial color="#fdfbf7" speed={2} distort={0.15} roughness={0.1} />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

export default function UltimateHeritageValentine() {
  const [sender, setSender] = useState({ name: "", gender: "" });
  const [target, setTarget] = useState({ name: "", gender: "" });
  const [step, setStep] = useState(1);
  const [isReceiver, setIsReceiver] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [muted, setMuted] = useState(false);
  const [copied, setCopied] = useState(false);

  //URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    const tg = params.get("tg");
    const from = params.get("from");
    if (to && tg && from) {
      setTarget({ name: decodeURIComponent(to), gender: tg });
      setSender({ name: decodeURIComponent(from), gender: "" });
      setIsReceiver(true);
    }
  }, []);

  useEffect(() => {
    if (!muted && isReceiver && !accepted) {
      sounds.heartbeat.play();
      const newRate = Math.min(1 + noCount * 0.1, 2.5);
      sounds.heartbeat.rate(newRate);
    }
    return () => sounds.heartbeat.stop();
  }, [muted, isReceiver, accepted, noCount]);

  const handleNo = useCallback(() => {
    setNoCount(prev => prev + 1);
    if (!muted) {
      sounds.click.play();
      if ("vibrate" in navigator) navigator.vibrate([15, 30, 15]);
    }
    const range = Math.min(150 + noCount * 20, 350);
    setNoPos({ x: (Math.random() - 0.5) * range, y: (Math.random() - 0.5) * range });
  }, [noCount, muted]);

  const handleYes = () => {
    setAccepted(true);
    if (!muted) sounds.success.play();
    confetti({ 
      particleCount: 200, 
      spread: 90, 
      origin: { y: 0.7 }, 
      colors: ['#8B0000', '#C5A059', '#FDFBF7', '#16302B'] 
    });
  };

  const proceedToStep2 = () => {
    setTarget({ name: "", gender: "" }); // Clears inheritance from sender(this shii is annoyinh)
    setStep(2);
  };

  const copyLink = () => {
    const link = `${window.location.origin}/?to=${encodeURIComponent(target.name)}&tg=${target.gender}&from=${encodeURIComponent(sender.name)}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const yesScale = useMemo(() => 1 + Math.pow(noCount, 1.4) * 0.35, [noCount]);

  return (
    <div style={styles.container}>
      <HeritageBackground />
      
      {isReceiver && !accepted && (
        <motion.div
          animate={{ opacity: [0, 0.15 * (1 + noCount * 0.1), 0] }}
          transition={{ repeat: Infinity, duration: Math.max(0.4, 1 - noCount * 0.1) }}
          style={styles.pulseVignette}
        />
      )}

      <div style={styles.hud}>
        <button onClick={() => setMuted(!muted)} style={styles.iconButton}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isReceiver ? (
          <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.heritageCard}>
            <div style={styles.seal}>ST. VALENTINE'S EVE</div>
            {step === 1 ? (
              <>
                <User size={28} color="#8B0000" />
                <h1 style={styles.title}>The Sender</h1>
                <input 
                  style={styles.input} 
                  placeholder="Your Full Name" 
                  value={sender.name}
                  onChange={(e) => setSender({...sender, name: e.target.value})} 
                />
                <button disabled={!sender.name} onClick={proceedToStep2} style={styles.primaryBtn}>Proceed →</button>
              </>
            ) : step === 2 ? (
              <>
                <Target size={28} color="#C5A059" />
                <h1 style={styles.title}>The Valentine</h1>
                <input 
                  style={styles.input} 
                  placeholder="The Recipient's Name" 
                  value={target.name}
                  onChange={(e) => setTarget({...target, name: e.target.value})} 
                />
                <div style={styles.genderRow}>
                  {['m', 'f', 'nb'].map((g) => (
                    <button key={g} onClick={() => setTarget({...target, gender: g})} style={{ ...styles.genderBtn, color: target.gender === g ? '#FDFBF7' : '#16302B', background: target.gender === g ? '#8B0000' : 'transparent', borderColor: target.gender === g ? '#8B0000' : '#16302B' }}>
                      {g === 'm' ? "Gentleman" : g === 'f' ? "Lady" : "Neutral"}
                    </button>
                  ))}
                </div>
                <div style={{display:'flex', gap: '10px', width: '100%'}}>
                  <button onClick={() => setStep(1)} style={styles.noBtn}>Back</button>
                  <button disabled={!target.name || !target.gender} onClick={() => setStep(3)} style={styles.primaryBtn}>Finalize</button>
                </div>
              </>
            ) : (
              <>
                <ShieldCheck size={36} color="#8B0000" />
                <h1 style={styles.title}>Commission Ready</h1>
                <p style={styles.subtitle}>The Valentine's invitation for {target.name} is sealed.</p>
                <button onClick={copyLink} style={styles.primaryBtn}>
                  {copied ? <Check size={16}/> : <PenTool size={16}/>}
                  {copied ? "Link Copied" : "Seal & Copy Link"}
                </button>
                <button onClick={() => setStep(2)} style={{...styles.noBtn, width: '100%', border: 'none'}}>Revise Details</button>
              </>
            )}
          </motion.div>
        ) : !accepted ? (
          <motion.div key="card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={styles.heritageCard}>
            <div style={styles.crest}><Heart size={24} fill="#8B0000" stroke="none" /></div>
            <h2 style={styles.title}>
              Would you do me the distinct honor of being my <span style={{color: '#8B0000'}}>Valentine</span>, <br/>
              <span style={{ color: '#C5A059' }}>{target.name}</span>?
            </h2>
            <p style={styles.subtitle}>A formal correspondence from {sender.name}.</p>
            <div style={styles.buttonStack}>
              <motion.button 
                onClick={handleYes} 
                style={{ ...styles.yesBtn, scale: yesScale, zIndex: 50 }}
                animate={{ boxShadow: [`0 0 0px rgba(139,0,0,0)`, `0 0 ${20 + noCount * 10}px rgba(139,0,0,0.4)`, `0 0 0px rgba(139,0,0,0)`] }}
                transition={{ repeat: Infinity, duration: Math.max(0.4, 1 - noCount * 0.1) }}
              >
                Accept 🖋️
              </motion.button>
              <motion.button animate={{ x: noPos.x, y: noPos.y }} onMouseEnter={handleNo} style={styles.noBtn}>
                {noCount > 4 ? "Declined" : "Decline"}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.heritageCard}>
            <ShieldCheck size={56} color="#8B0000" strokeWidth={1} />
            <h1 style={styles.successTitle}>CONTRACT SEALED</h1>
            <p style={styles.subtitle}>
              {target.name} is officially <span style={{color: '#8B0000', fontWeight: 800}}>{sender.name}'s</span> Valentine.
            </p>
            <div style={styles.divider} />
            <div style={styles.timestamp}><Calendar size={12} /> FEB 14, 2026</div>
            <div style={styles.monogram}>{target.name.charAt(0)}{sender.name.charAt(0)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", background: "#fdfbf7", color: "#16302B", fontFamily: "'Playfair Display', serif", overflow: "hidden", position: "relative" },
  canvasContainer: { position: "absolute", inset: 0, zIndex: 0 },
  pulseVignette: { position: "absolute", inset: 0, background: "radial-gradient(circle, transparent 30%, #8B0000 150%)", zIndex: 1, pointerEvents: "none" },
  heritageCard: { background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(25px)", border: "1.2px solid #C5A059", borderRadius: "2px", padding: "clamp(2rem, 8vw, 4rem) clamp(1.5rem, 5vw, 3rem)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(1rem, 3vw, 1.8rem)", width: "90%", maxWidth: "460px", zIndex: 10, boxShadow: "0 40px 100px rgba(0,0,0,0.1)" },
  seal: { fontSize: "0.6rem", letterSpacing: "4px", borderBottom: "1px solid #C5A059", paddingBottom: "5px", color: '#8B0000' },
  title: { fontSize: "clamp(1.5rem, 6vw, 2.1rem)", fontWeight: 700, margin: 0, lineHeight: 1.2 },
  subtitle: { fontSize: "clamp(0.85rem, 3vw, 1rem)", fontStyle: "italic", opacity: 0.8 },
  input: { background: "transparent", border: "none", borderBottom: "1px solid #16302B", padding: "0.8rem", color: "#16302B", fontSize: "1.1rem", width: "100%", textAlign: "center", outline: "none", fontFamily: "serif" },
  genderRow: { display: "flex", gap: "8px", width: "100%" },
  genderBtn: { flex: 1, padding: "10px", border: "1px solid #16302B", cursor: "pointer", fontSize: "0.65rem", letterSpacing: "1px", transition: '0.3s all' },
  primaryBtn: { background: "#16302B", color: "#fdfbf7", border: "none", padding: "1rem", width: "100%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", letterSpacing: "1px", fontWeight: 600 },
  yesBtn: { background: "#8B0000", color: "#FDFBF7", border: "none", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: 600, cursor: "pointer" },
  noBtn: { background: "transparent", color: "#16302B", border: "1px solid #16302B", padding: "0.8rem 1.2rem", cursor: "pointer", fontSize: "0.9rem" },
  buttonStack: { display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "center", minHeight: "140px", width: "100%", position: "relative" },
  crest: { width: "45px", height: "45px", border: "1px solid #8B0000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  successTitle: { fontSize: "clamp(1.8rem, 7vw, 2.4rem)", fontWeight: 800, color: "#8B0000", letterSpacing: "2px" },
  timestamp: { fontSize: "0.7rem", letterSpacing: "2px", opacity: 0.6, display: "flex", alignItems: "center", gap: "6px" },
  divider: { width: "30px", height: "1px", background: "#C5A059" },
  monogram: { fontSize: "1.4rem", color: "#8B0000", fontStyle: "italic", border: "1px solid #8B0000", width: "55px", height: "55px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "2px" },
  hud: { position: "absolute", top: 20, right: 20, zIndex: 100 },
  iconButton: { background: "rgba(22, 48, 43, 0.05)", border: "none", padding: "10px", borderRadius: "50%", color: "#16302B", cursor: "pointer" }
};
// my name is fluxx, 001