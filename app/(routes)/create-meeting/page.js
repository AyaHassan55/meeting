'use client'
import { useState } from "react";
// import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, Phone, Link2, Copy, Check, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getFirestore } from "firebase/firestore";
// import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "../dashboard/layout";
import { app } from "../dashboard/confing/FirebaseConfing";
import { doc, setDoc } from "firebase/firestore"; 
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import meetingTypes from "../_utils/meeting-type";

const durations = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "60 min" },
];



export default function CreateMeeting() {
//   const { toast } = useToast();

  const [meetingName, setMeetingName] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedType, setSelectedType] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
 const {user} = useKindeBrowserClient();
  const db = getFirestore(app);

 const generateSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const start = `${hour.toString().padStart(2, "0")}:00`;
      const endHour = hour + selectedDuration / 60;
      const endMinute = selectedDuration % 60;
      const end = `${Math.floor(endHour)
        .toString()
        .padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

      if (endHour <= 18) {
        slots.push({ start, end });
      }
    }
    return slots;
  };

  const handleGenerate = () => {
    if (!meetingName || !selectedType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const slug = meetingName.toLowerCase().replace(/\s+/g, "-");
    setGeneratedLink(`https://meetflow.app/schedule/${slug}`);

    toast({
      title: "Meeting link generated!",
      description: "Your shareable link is ready to copy",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast({
          description: "The meeting link has been copied to your clipboard",
    });
 
  };
  const onCreateMeeting = async () => {
    

    // Add a new document in collection "cities"
    if (!user) {
    console.log("User not loaded yet");
    return;
  }
    await setDoc(doc(db, "Meeting", user.email), {
      meetingName: meetingName,
      email:user.email,
      userName:  user.given_name +' '+user.family_name,
    }).then((resp)=>console.log('doc saved successfully !'));

  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl"
        >
          <h1 className="text-3xl font-bold mb-2">Create Meeting</h1>
          <p className="text-muted-foreground mb-8">
            Set up a new meeting type for others to book
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Meeting Name */}
              <div className="space-y-2">
                <Label>Meeting Name</Label>
                <Input
                  placeholder="e.g., Quick Chat, Strategy Session"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <Label>Meeting Duration</Label>
                <div className="grid grid-cols-4 gap-3">
                  {durations.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDuration(d.value)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition",
                        selectedDuration === d.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm">{d.label}</span>
                    </button>
                  ))}
                </div> 
              </div>

              {/* Meeting Type */}
              <div className="space-y-3">
                <Label>Meeting Type</Label>
               <div className="grid grid-cols-3 gap-3">
                  {meetingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition",
                        selectedType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2",
                          type.color
                        )}
                      >
                        <type.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm">{type.name}</span>
                    </button>
                  ))}
                </div> 
              </div>

              {/* Meeting Link */}
              {selectedType && selectedType !== "phone" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <Label>Meeting Link</Label>
                  <Input
                    placeholder="Paste meeting link"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </motion.div>
              )}

              <Button   
                onClick={onCreateMeeting} 
                disabled={!meetingName} size="lg" className="w-full hover:cursor-pointer" 
              // onClick={handleGenerate}
              >
                <Link2 className="w-5 h-5 mr-2 " />
                create meeting
              </Button>

              {generatedLink && (
                <div className="p-4 rounded-xl border">
                  <div className="flex gap-2 items-center">
                    <code className="flex-1 truncate">{generatedLink}</code>
                    <Button size="icon" variant="outline" onClick={handleCopy}>
                      {copied ? <Check /> : <Copy />}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-8 ">
              <div className="rounded-2xl p-6 border">
                <h3 className="font-bold mb-4 text-xl">Time Slots Preview</h3>
                <p className="text-sm text-muted-foreground mb-4"> Based on {selectedDuration} min duration </p>
                <div className="grid grid-cols-2 gap-2 max-h-100 overflow-y-auto">

                
                  {generateSlots().map((slot, i) => ( <div key={i} className="px-4 py-3 rounded-xl border border-border text-center
                   text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer" >
                     {slot.start} - {slot.end} </div> ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
